// Interações do design (abas, depoimentos, galeria, reveal). O formulário usa src/scripts/forms.ts.
(function () {
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function todos(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }

  var alvos = todos('.surge');
  if ('IntersectionObserver' in window && !reduzir) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visivel'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -5% 0px' });
    alvos.forEach(function (el) { io.observe(el); });
  } else {
    alvos.forEach(function (el) { el.classList.add('visivel'); });
  }

  /* Diferenciais: abas com troca automática até a primeira interação (só no desktop) */
  var palco = document.querySelector('[data-palco]');
  var abas = todos('.trilho li', palco), fotos = todos('.palco__fotos img', palco), atual = 0, automatico = null, sobre = false;
  function mostrar(i) {
    atual = i;
    abas.forEach(function (li, k) {
      li.classList.toggle('ativo', k === i);
      li.querySelector('button').setAttribute('aria-expanded', k === i ? 'true' : 'false');
    });
    fotos.forEach(function (f, k) { f.classList.toggle('ativa', k === i); });
  }
  abas.forEach(function (li, i) {
    li.querySelector('button').addEventListener('click', function () {
      clearInterval(automatico);
      mostrar(i);
      if (window.matchMedia('(max-width:860px)').matches) {
        requestAnimationFrame(function () {
          var topo = li.getBoundingClientRect().top;
          if (topo < 12) window.scrollBy({ top: topo - 12, behavior: 'auto' });
        });
      }
    });
  });
  palco.addEventListener('mouseenter', function () { sobre = true; });
  palco.addEventListener('mouseleave', function () { sobre = false; });
  if (!reduzir && window.matchMedia('(min-width:861px)').matches) {
    automatico = setInterval(function () {
      var r = palco.getBoundingClientRect();
      if (sobre || document.hidden || r.bottom < 0 || r.top > innerHeight) return;
      mostrar((atual + 1) % abas.length);
    }, 6000);
  }

  /* Depoimentos: troca automática até a primeira interação, com pausa sob o mouse */
  var depo = document.querySelector('[data-depo]');
  var depos = todos('.depo__lista li', depo), contador = depo.querySelector('[data-depo-contador]'), depoAtual = 0, depoSobre = false, depoAuto = null;
  function mostrarDepo(i) {
    depoAtual = (i + depos.length) % depos.length;
    depos.forEach(function (li, k) { li.classList.toggle('ativo', k === depoAtual); });
    contador.textContent = (depoAtual + 1) + ' / ' + depos.length;
  }
  todos('[data-depo-seta]', depo).forEach(function (b) {
    b.addEventListener('click', function () { clearInterval(depoAuto); mostrarDepo(depoAtual + Number(b.dataset.depoSeta)); });
  });
  depo.addEventListener('mouseenter', function () { depoSobre = true; });
  depo.addEventListener('mouseleave', function () { depoSobre = false; });
  if (!reduzir) {
    depoAuto = setInterval(function () {
      var r = depo.getBoundingClientRect();
      if (depoSobre || document.hidden || r.bottom < 0 || r.top > innerHeight) return;
      mostrarDepo(depoAtual + 1);
    }, 7000);
  }

  var carrossel = document.querySelector('[data-carrossel]');
  var contadorGaleria = document.querySelector('[data-galeria-contador]'), fotosGaleria = todos('figure', carrossel);
  function umaPorVez() { return window.matchMedia('(max-width:560px)').matches; }
  function indiceGaleria() { return Math.round(carrossel.scrollLeft / carrossel.clientWidth); }
  todos('[data-seta]').forEach(function (b) {
    b.addEventListener('click', function () {
      var dir = Number(b.dataset.seta), comportamento = reduzir ? 'auto' : 'smooth';
      if (umaPorVez()) {
        var alvo = (indiceGaleria() + dir + fotosGaleria.length) % fotosGaleria.length;
        carrossel.scrollTo({ left: alvo * carrossel.clientWidth, behavior: comportamento });
      } else {
        carrossel.scrollBy({ left: dir * carrossel.clientWidth * .7, behavior: comportamento });
      }
    });
  });
  carrossel.addEventListener('scroll', function () {
    if (umaPorVez()) contadorGaleria.textContent = (indiceGaleria() + 1) + ' / ' + fotosGaleria.length;
  }, { passive: true });

  todos('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
