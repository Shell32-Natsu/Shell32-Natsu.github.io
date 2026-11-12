(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function escapeHTML(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------------------------------------------------------------- theme
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var themeListeners = [];

  $$('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = root.dataset.theme || (darkQuery.matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      var apply = function () {
        root.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) {}
        themeListeners.forEach(function (fn) { fn(); });
      };
      if (!document.startViewTransition || reducedMotion.matches) { apply(); return; }

      // The new colours grow out of the button in a circle.
      var box = btn.getBoundingClientRect();
      var x = box.left + box.width / 2, y = box.top + box.height / 2;
      var radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      root.classList.add('theme-switching');
      var transition = document.startViewTransition(apply);
      transition.ready.then(function () {
        root.animate(
          { clipPath: ['circle(0 at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
          { duration: 520, easing: 'cubic-bezier(0.3, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(function () {});
      transition.finished.then(function () { root.classList.remove('theme-switching'); });
    });
  });
  darkQuery.addEventListener('change', function () { themeListeners.forEach(function (fn) { fn(); }); });

  // ------------------------------------------------------- title morphing
  // The title you click travels into the heading of the post it opens (and
  // back again): both carry the same view-transition-name across the
  // navigation. Only one element may hold the name at a time.
  var morphing = null;
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a');
    var el = link && (link.matches('[data-morph]') ? link : link.querySelector('[data-morph]'));
    if (!el) return;
    if (morphing) morphing.style.viewTransitionName = '';
    el.style.viewTransitionName = 'title';
    morphing = el;
  });

  // ----------------------------------------------------------- ascii hero
  // Draws a word as a field of live ASCII glyphs. The word is rasterised
  // once into a coverage mask (one value per character cell); every frame
  // maps mask × flowing noise onto a density ramp. Each row is drawn as at
  // most three strings (dim, solid, highlight), so a frame is a few dozen
  // fillText calls no matter how many cells there are.
  $$('canvas[data-ascii]').forEach(function (canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var RAMP = ' .:-=+*#%@';
    var NOISE = '01<>/\\[]{}#$%&*+=';
    var word = canvas.dataset.ascii;
    var w = 0, h = 0, cols = 0, rows = 0, cw = 0, ch = 0, mask = null;
    var ink = '#000', glow = '#0a8';
    var pointer = { x: 0, y: 0, k: 0, on: 0 };
    var born = performance.now(), last = 0, visible = true, queued = false;

    function readColors() {
      var cs = getComputedStyle(canvas);
      ink = cs.color;
      glow = cs.borderTopColor;
    }

    function layout() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      var size = w < 520 ? 6 : w < 900 ? 8 : w < 1500 ? 10 : 12;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = size + 'px ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "DejaVu Sans Mono", monospace';
      ctx.textBaseline = 'top';
      cw = ctx.measureText('M').width;
      ch = Math.round(size * 1.35);
      cols = Math.ceil(w / cw);
      rows = Math.ceil(h / ch);

      // Rasterise the word at 4×8 samples per cell and average the alpha.
      var sx = 4, sy = 8;
      var off = document.createElement('canvas');
      off.width = cols * sx;
      off.height = rows * sy;
      var o = off.getContext('2d', { willReadFrequently: true });
      var face = 'px system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif';
      o.font = '900 100' + face;
      var m = o.measureText(word);
      var cap = m.actualBoundingBoxAscent || 72;
      // Fit to the width, then stretch vertically to a fixed proportion so
      // the word looks the same whatever the system's heavy sans is.
      var fit = Math.min(w * 0.9, 1500) / m.width;
      var tall = Math.min(1.7, Math.max(1, m.width / cap / (word.length * 0.66)));
      var over = (cap * fit * tall) / (h * 0.66);
      if (over > 1) fit /= over;
      var height = cap * fit * tall;
      o.scale(sx / cw, sy / ch);
      o.translate(w / 2, h / 2 + height / 2);
      o.scale(1, height / (cap * fit));
      o.font = '900 ' + (100 * fit) + face;
      o.textAlign = 'center';
      o.fillStyle = '#000';
      o.fillText(word, 0, 0);
      var data = o.getImageData(0, 0, off.width, off.height).data;
      mask = new Float32Array(cols * rows);
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var sum = 0;
          for (var y = 0; y < sy; y++) {
            var base = ((j * sy + y) * off.width + i * sx) * 4 + 3;
            for (var x = 0; x < sx; x++) sum += data[base + x * 4];
          }
          mask[j * cols + i] = sum / (sx * sy * 255);
        }
      }
    }

    function draw(now) {
      if (!mask) return;
      var t = (now - born) / 1000;
      var still = reducedMotion.matches;
      if (still) t = 100;
      pointer.k += (pointer.on - pointer.k) * 0.12;
      var reach = Math.max(90, w * 0.09);
      var r2 = reach * reach;
      // A band of highlight crosses the word every few seconds.
      var sweep = ((t * 0.16) % 1.7) - 0.35;
      var span = cols + rows * 2;

      ctx.clearRect(0, 0, w, h);
      for (var j = 0; j < rows; j++) {
        var dim = '', solid = '', lit = '';
        var hasDim = false, hasSolid = false, hasLit = false;
        var wave = 1.6 * Math.sin(j * 0.19 - t * 0.23);
        for (var i = 0; i < cols; i++) {
          var m = mask[j * cols + i];
          var n = 0.5 +
            0.25 * Math.sin(i * 0.045 + t * 0.45 + wave) +
            0.25 * Math.sin(j * 0.31 + t * 0.33 + 1.4 * Math.sin(i * 0.023 + t * 0.19));
          var dx = i * cw - pointer.x, dy = j * ch - pointer.y;
          var p = pointer.k > 0.01 ? pointer.k * Math.exp(-(dx * dx + dy * dy) / r2) : 0;
          var v, layer;

          if (m > 0.06) {
            v = m * (0.7 + 0.3 * n) + p * 0.25;
            layer = p > 0.28 || Math.abs((i + j * 2) / span - sweep) < 0.02 ? 2 : 1;
          } else {
            // Outside the word: a regular dot grid that the same field
            // washes over, and that the pointer lights up.
            if (i % 4 || j % 2) v = 0;
            else v = (n < 0.3 ? 0 : n < 0.72 ? 0.1 : 0.5) + p * 0.9;
            layer = p > 0.12 ? 2 : 0;
          }

          var glyph = RAMP.charAt(v >= 1 ? 9 : (v * 10) | 0);

          // Intro: cells start as noise and resolve from left to right.
          if (!still && t < 1.8) {
            var seed = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
            var gate = t * 1.25 - (i / cols) * 0.9 - (seed - Math.floor(seed)) * 0.45;
            if (gate < 0) {
              glyph = ' ';
            } else if (gate < 0.22) {
              glyph = m > 0.06 || Math.random() < 0.12 ? NOISE.charAt((Math.random() * NOISE.length) | 0) : ' ';
              layer = m > 0.06 ? 2 : 0;
            }
          }

          if (glyph === ' ') { dim += ' '; solid += ' '; lit += ' '; }
          else if (layer === 0) { dim += glyph; solid += ' '; lit += ' '; hasDim = true; }
          else if (layer === 1) { dim += ' '; solid += glyph; lit += ' '; hasSolid = true; }
          else { dim += ' '; solid += ' '; lit += glyph; hasLit = true; }
        }
        var top = j * ch;
        if (hasDim) { ctx.globalAlpha = 0.42; ctx.fillStyle = ink; ctx.fillText(dim, 0, top); }
        if (hasSolid) { ctx.globalAlpha = 1; ctx.fillStyle = ink; ctx.fillText(solid, 0, top); }
        if (hasLit) { ctx.globalAlpha = 1; ctx.fillStyle = glow; ctx.fillText(lit, 0, top); }
      }
    }

    function frame(now) {
      queued = false;
      if (!visible) return;
      if (now - last >= 33) { last = now; draw(now); }
      if (!reducedMotion.matches) schedule();
    }
    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    }
    function refresh() {
      readColors();
      draw(performance.now());
      schedule();
    }

    var hero = canvas.parentNode;
    hero.addEventListener('pointermove', function (e) {
      var box = canvas.getBoundingClientRect();
      pointer.x = e.clientX - box.left;
      pointer.y = e.clientY - box.top;
      pointer.on = 1;
    });
    ['pointerleave', 'pointerup', 'pointercancel'].forEach(function (type) {
      hero.addEventListener(type, function (e) {
        if (type === 'pointerup' && e.pointerType === 'mouse') return;
        pointer.on = 0;
      });
    });

    themeListeners.push(refresh);
    if ('ResizeObserver' in window) {
      new ResizeObserver(function () { layout(); refresh(); }).observe(canvas);
    } else {
      layout();
      refresh();
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) schedule();
      }).observe(canvas);
    }
  });

  // ---------------------------------------------------------- code blocks
  $$('.prose pre').forEach(function (pre) {
    var code = pre.querySelector('code');
    var wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var lang = code && Array.prototype.find.call(code.classList, function (c) { return c !== 'hljs'; });
    if (lang) {
      var label = document.createElement('span');
      label.className = 'code-lang';
      label.textContent = lang.replace(/^language-/, '');
      wrapper.appendChild(label);
    }

    if (!navigator.clipboard) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.textContent = '复制';
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText((code || pre).innerText.replace(/\n$/, '')).then(function () {
        btn.textContent = '已复制';
        setTimeout(function () { btn.textContent = '复制'; }, 1500);
      });
    });
    wrapper.appendChild(btn);
  });

  // ------------------------------------------------------------------ toc
  var tocLinks = $$('.post-toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    var headings = [];
    tocLinks.forEach(function (a) {
      var id = decodeURIComponent(a.getAttribute('href').slice(1));
      var el = document.getElementById(id);
      if (el) { byId[id] = a; headings.push(el); }
    });
    var visible = new Set();
    var setActive = function () {
      var current = headings.find(function (h) { return visible.has(h); });
      if (!current) {
        // Nothing visible: pick the last heading above the viewport
        current = headings.filter(function (h) { return h.getBoundingClientRect().top < 40; }).pop();
      }
      tocLinks.forEach(function (a) { a.classList.remove('is-active'); });
      if (current) byId[current.id].classList.add('is-active');
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
      setActive();
    }, { rootMargin: '0px 0px -60% 0px' });
    headings.forEach(function (h) { io.observe(h); });
  }

  // --------------------------------------------------------- list filter
  var filterInput = $('[data-filter-input]');
  if (filterInput) {
    var groups = $$('.year');
    var empty = $('[data-filter-empty]');
    filterInput.addEventListener('input', function () {
      var q = filterInput.value.trim().toLowerCase();
      var any = false;
      groups.forEach(function (group) {
        var shown = 0;
        $$('.row', group).forEach(function (row) {
          var match = !q || row.dataset.filterText.indexOf(q) !== -1;
          row.hidden = !match;
          if (match) shown++;
        });
        group.hidden = shown === 0;
        var count = $('.year-label small', group);
        if (count) count.textContent = shown + ' 篇';
        any = any || shown > 0;
      });
      if (empty) empty.hidden = any;
    });
  }

  // ------------------------------------------------------------- comments
  var comments = $('#comments[data-disqus]');
  if (comments) {
    var loaded = false;
    var loadDisqus = function () {
      if (loaded) return;
      loaded = true;
      var d = comments.dataset;
      window.disqus_config = function () {
        this.page.url = d.url;
        this.page.identifier = d.identifier;
        this.page.title = d.title;
      };
      var s = document.createElement('script');
      s.src = 'https://' + d.disqus + '.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      s.onerror = function () {
        $('#disqus_thread').innerHTML = '<p class="empty">评论加载失败（Disqus 在部分网络环境下不可用）。</p>';
      };
      document.body.appendChild(s);
    };
    var btn = $('[data-load-comments]', comments);
    if (btn) btn.addEventListener('click', loadDisqus);
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { cio.disconnect(); loadDisqus(); }
      }, { rootMargin: '400px 0px' });
      cio.observe(comments);
    }
  }

  // --------------------------------------------------------------- search
  var dialog = $('#search-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var input = $('#search-input');
  var list = $('#search-results');
  var status = $('#search-status');
  var index = null;
  var loading = null;
  var selected = 0;

  function loadIndex() {
    if (!loading) {
      status.textContent = '正在加载索引…';
      loading = fetch(dialog.dataset.index)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          index = data.map(function (p) {
            p.tl = p.t.toLowerCase();
            p.ml = (p.c.concat(p.g)).join(' ').toLowerCase();
            p.xl = p.x.toLowerCase();
            return p;
          });
          render();
        })
        .catch(function () { status.textContent = '索引加载失败，请稍后重试'; loading = null; });
    }
    return loading;
  }

  function openSearch() {
    if (dialog.open) return;
    dialog.showModal();
    input.select();
    loadIndex();
  }

  function highlight(text, terms) {
    var html = escapeHTML(text);
    terms.forEach(function (t) {
      var re = new RegExp('(' + escapeHTML(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      html = html.replace(re, '<mark>$1</mark>');
    });
    return html;
  }

  function snippet(post, terms) {
    var pos = -1;
    for (var i = 0; i < terms.length && pos === -1; i++) pos = post.xl.indexOf(terms[i]);
    if (pos === -1) return post.x.slice(0, 90);
    var start = Math.max(0, pos - 30);
    return (start > 0 ? '…' : '') + post.x.slice(start, start + 110);
  }

  function search(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var results = [];
    index.forEach(function (p) {
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i], s = 0;
        if (p.tl.indexOf(t) !== -1) s += 10;
        if (p.ml.indexOf(t) !== -1) s += 4;
        if (p.xl.indexOf(t) !== -1) s += 1;
        if (!s) return;
        score += s;
      }
      results.push({ post: p, score: score });
    });
    results.sort(function (a, b) { return b.score - a.score || (a.post.d < b.post.d ? 1 : -1); });
    return { terms: terms, items: results.slice(0, 40), total: results.length };
  }

  function render() {
    if (!index) return;
    var q = input.value.trim();
    selected = 0;
    if (!q) {
      list.innerHTML = '';
      status.textContent = '共 ' + index.length + ' 篇文章 · ↑↓ 选择 · ↵ 打开';
      return;
    }
    var r = search(q);
    list.innerHTML = r.items.map(function (item, i) {
      var p = item.post;
      return '<li><a href="' + p.u + '" role="option" aria-selected="' + (i === 0) + '">' +
        '<b>' + highlight(p.t, r.terms) + '</b>' +
        '<small>' + p.d + (p.c.length ? ' · ' + escapeHTML(p.c.join(' / ')) : '') + '</small>' +
        '<span>' + highlight(snippet(p, r.terms), r.terms) + '</span>' +
        '</a></li>';
    }).join('');
    status.textContent = r.total ? (r.total > r.items.length ? '显示前 ' + r.items.length + ' 条，共 ' + r.total + ' 条结果' : '') : '没有找到相关文章';
  }

  function move(delta) {
    var links = $$('a', list);
    if (!links.length) return;
    links[selected].setAttribute('aria-selected', 'false');
    selected = (selected + delta + links.length) % links.length;
    links[selected].setAttribute('aria-selected', 'true');
    links[selected].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', render);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    // A search field swallows the first Escape to clear itself; close instead.
    else if (e.key === 'Escape') { e.preventDefault(); dialog.close(); }
    else if (e.key === 'Enter' && !e.isComposing) {
      var link = $$('a', list)[selected];
      if (link) { e.preventDefault(); window.location.href = link.href; }
    }
  });

  $$('[data-search-open]').forEach(function (b) { b.addEventListener('click', openSearch); });
  $$('[data-search-close]').forEach(function (b) { b.addEventListener('click', function () { dialog.close(); }); });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });

  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
      e.preventDefault();
      openSearch();
    }
  });
})();
