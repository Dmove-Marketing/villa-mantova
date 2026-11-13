/* ============================================================
   VILLA MANTOVA — interações
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');
  function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }
  burger.addEventListener('click', function () {
    var open = mobileMenu.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Reveal on scroll (clock-safe: enables motion only if the
       animation clock is actually advancing; otherwise content stays visible) ---------- */
  var docEl = document.documentElement;
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  reveals.forEach(function (el) {
    var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.style.transitionDelay = Math.min(sib, 5) * 70 + 'ms';
  });
  function checkReveal() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      if (el.getBoundingClientRect().top < vh - 60) el.classList.add('in');
    });
  }
  // Probe the animation clock across two frames.
  var frames = 0;
  function probe() { frames++; if (frames < 4) requestAnimationFrame(probe); }
  requestAnimationFrame(probe);
  setTimeout(function () {
    if (frames >= 2) {
      // clock is live → enable entrance animation, reveal what's in view
      docEl.classList.add('anim');
      checkReveal();
      window.addEventListener('scroll', checkReveal, { passive: true });
      window.addEventListener('resize', checkReveal);
    }
    // if frozen (frames < 2) do nothing: .reveal stays visible by default
  }, 220);

  /* ---------- Lightbox ---------- */
  var imgs = Array.prototype.map.call(document.querySelectorAll('.g-item img'), function (i) { return i.src; });
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var idx = 0;
  function show(i) { idx = (i + imgs.length) % imgs.length; lbImg.src = imgs[idx]; }
  document.querySelectorAll('.g-item').forEach(function (item, i) {
    item.addEventListener('click', function () { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; });
  });
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
  document.getElementById('lbNext').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* ---------- Privacy Popup ---------- */
  var privacyBtn = document.getElementById('privacyBtn');
  var privacyPopup = document.getElementById('privacyPopup');
  var closePrivacy = document.getElementById('closePrivacy');
  if (privacyBtn && privacyPopup && closePrivacy) {
    privacyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      privacyPopup.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    function closePopup() {
      privacyPopup.classList.remove('open');
      document.body.style.overflow = '';
    }
    closePrivacy.addEventListener('click', closePopup);
    privacyPopup.addEventListener('click', function (e) {
      if (e.target === privacyPopup) closePopup();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && privacyPopup.classList.contains('open')) closePopup();
    });
  }

  /* ---------- Testimonial Slider ---------- */
  var depoPrev = document.getElementById('depoPrev');
  var depoNext = document.getElementById('depoNext');
  var depoCards = document.querySelectorAll('.depo-card-large');
  var depoIdx = 0;
  if (depoPrev && depoNext && depoCards.length > 0) {
    var showDepo = function (i) {
      depoCards[depoIdx].classList.remove('active');
      depoIdx = (i + depoCards.length) % depoCards.length;
      depoCards[depoIdx].classList.add('active');
    };
    depoPrev.addEventListener('click', function () { showDepo(depoIdx - 1); });
    depoNext.addEventListener('click', function () { showDepo(depoIdx + 1); });
  }
})();
