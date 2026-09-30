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

  $$('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = root.dataset.theme || (darkQuery.matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  });

  // --------------------------------------------------------------- header
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

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
        current = headings.filter(function (h) { return h.getBoundingClientRect().top < 100; }).pop();
      }
      tocLinks.forEach(function (a) { a.classList.remove('is-active'); });
      if (current) byId[current.id].classList.add('is-active');
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
      setActive();
    }, { rootMargin: '-72px 0px -60% 0px' });
    headings.forEach(function (h) { io.observe(h); });
  }

  // --------------------------------------------------------- list filter
  var filterInput = $('[data-filter-input]');
  if (filterInput) {
    var groups = $$('.year-group');
    var empty = $('[data-filter-empty]');
    filterInput.addEventListener('input', function () {
      var q = filterInput.value.trim().toLowerCase();
      var any = false;
      groups.forEach(function (group) {
        var shown = 0;
        $$('.post-row', group).forEach(function (row) {
          var match = !q || row.dataset.filterText.indexOf(q) !== -1;
          row.hidden = !match;
          if (match) shown++;
        });
        group.hidden = shown === 0;
        var count = $('.year-label small', group);
        if (count) count.textContent = shown;
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
        $('#disqus_thread').innerHTML = '<p class="search-status">评论加载失败（Disqus 在部分网络环境下不可用）。</p>';
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
        '<span class="search-result-title">' + highlight(p.t, r.terms) + '</span>' +
        '<span class="search-result-meta">' + p.d + (p.c.length ? ' · ' + escapeHTML(p.c.join(' / ')) : '') + '</span>' +
        '<span class="search-result-snippet">' + highlight(snippet(p, r.terms), r.terms) + '</span>' +
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
