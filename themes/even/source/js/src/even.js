(function () {
  'use strict';

  // ===== Dark mode =====
  // Theme is set before paint via inline <head> script to avoid FOUC.
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var root = document.documentElement;
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // ===== Reading progress bar =====
  var bar = document.getElementById('progress-bar');
  if (bar) {
    var updateBar = function () {
      var h = document.documentElement;
      var scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = (scrolled * 100) + '%';
    };
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  // ===== Back to top =====
  var back = document.getElementById('back-to-top');
  if (back) {
    window.addEventListener('scroll', function () {
      back.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    back.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Mobile menu =====
  var navIcon = document.querySelector('.mobile-navbar-icon');
  var mobileMenu = document.getElementById('mobile-menu');
  if (navIcon && mobileMenu) {
    navIcon.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      navIcon.classList.toggle('icon-click', open);
      navIcon.classList.toggle('icon-out', !open);
      document.body.classList.toggle('mobile-menu-open', open);
    });
  }

  // ===== TOC active heading (IntersectionObserver) =====
  var tocLinks = document.querySelectorAll('.toc-link');
  var headings = document.querySelectorAll('.post-content .headerlink');
  if (tocLinks.length && headings.length && 'IntersectionObserver' in window) {
    var linkMap = {};
    tocLinks.forEach(function (link) {
      linkMap[decodeURIComponent(link.getAttribute('href'))] = link;
    });

    var activeId = null;
    var setActive = function (id) {
      if (id === activeId) return;
      if (activeId && linkMap[activeId]) linkMap[activeId].classList.remove('active');
      if (id && linkMap[id]) linkMap[id].classList.add('active');
      activeId = id;
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive('#' + entry.target.parentElement.id);
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });

    headings.forEach(function (h) { observer.observe(h); });
  }

  // ===== Weibo image referrer fix =====
  document.querySelectorAll('img[src*=".sinaimg.cn/"]').forEach(function (img) {
    img.setAttribute('referrerpolicy', 'no-referrer');
  });

  // ===== Simple image zoom (native <dialog>) =====
  if ('HTMLDialogElement' in window) {
    var dialog = document.createElement('dialog');
    dialog.className = 'image-zoom';
    dialog.innerHTML = '<img>';
    document.body.appendChild(dialog);
    var zoomImg = dialog.querySelector('img');

    dialog.addEventListener('click', function () { dialog.close(); });

    document.querySelectorAll('.post-content img').forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        zoomImg.src = img.src;
        zoomImg.alt = img.alt || '';
        dialog.showModal();
      });
    });
  }
})();
