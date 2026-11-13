// Réplica de villamantova.com.br/corporativo/ — JavaScript original (o formulário monta a mensagem e abre o WhatsApp do original)
/**
 * Villa Mantova Corporativo - JavaScript Principal
 * Interatividade de alto padrão, sem dependências externas
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- CONSTANTES E UTILITÁRIOS ---
  const WHATSAPP_NUMBER = '5511981001030';
  const WHATSAPP_DEFAULT_MESSAGE = 'Olá! Gostaria de informações sobre eventos corporativos no Villa Mantova.';

  function getWhatsAppLink(customMsg) {
    const msg = encodeURIComponent(customMsg || WHATSAPP_DEFAULT_MESSAGE);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  // --- 1. HEADER SCROLL EFFECT & SCROLL TO TOP ---
  const mainHeader = document.getElementById('main-header');
  if (mainHeader) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Links de Início e Logo rolam até o topo absoluto (Y=0) exibindo a tarja superior
  const topScrollTriggers = document.querySelectorAll('a[href="#inicio"], .brand-logo, .enm-back-to-top');
  topScrollTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (history.pushState) {
        history.pushState(null, null, '#inicio');
      }
    });
  });

  // --- 2. MENU MOBILE DRAWER ---
  const menuBtn = document.getElementById('menu-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. MODAL DE PROPOSTA & VISITA TÉCNICA ---
  const proposalModal = document.getElementById('proposal-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalForm = document.getElementById('proposal-form');
  const modalFormView = document.getElementById('modal-form-view');
  const modalSuccessView = document.getElementById('modal-success-view');
  const modalSuccessDoneBtn = document.getElementById('modal-success-done-btn');
  const formatSelect = document.getElementById('modal-format-select');

  function openProposalModal(initialFormat) {
    if (!proposalModal) return;
    if (initialFormat && formatSelect) {
      formatSelect.value = initialFormat;
    }
    if (modalFormView && modalSuccessView) {
      modalFormView.style.display = 'block';
      modalSuccessView.style.display = 'none';
    }
    proposalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProposalModal() {
    if (!proposalModal) return;
    proposalModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Gatilhos para abrir o modal em botões espalhados pela página
  const openModalButtons = document.querySelectorAll('[data-open-modal]');
  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const format = btn.getAttribute('data-format') || '';
      openProposalModal(format);
      if (mobileDrawer) {
        mobileDrawer.classList.remove('open');
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProposalModal);
  }

  if (modalSuccessDoneBtn) {
    modalSuccessDoneBtn.addEventListener('click', () => {
      closeProposalModal();
      if (modalForm) modalForm.reset();
    });
  }

  if (proposalModal) {
    proposalModal.addEventListener('click', (e) => {
      if (e.target === proposalModal) {
        closeProposalModal();
      }
    });
  }

  // Envio do Formulário do Modal com Redirecionamento ao WhatsApp
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-name')?.value || '';
      const company = document.getElementById('modal-company')?.value || '';
      const email = document.getElementById('modal-email')?.value || '';
      const phone = document.getElementById('modal-phone')?.value || '';
      const format = formatSelect?.value || 'Treinamentos e Workshops';
      const attendees = document.getElementById('modal-attendees')?.value || '50 a 100 pessoas';
      const date = document.getElementById('modal-date')?.value || 'A definir';
      const notes = document.getElementById('modal-notes')?.value || '';

      const msg = `*PROPOSTA CORPORATIVA - VILLA MANTOVA*\n\n` +
        `*Nome:* ${name}\n` +
        `*Empresa:* ${company}\n` +
        `*E-mail:* ${email}\n` +
        `*WhatsApp:* ${phone}\n` +
        `*Formato:* ${format}\n` +
        `*Pessoas:* ${attendees}\n` +
        `*Previsão de Data:* ${date}\n` +
        (notes ? `*Observações:* ${notes}\n` : '');

      if (modalFormView && modalSuccessView) {
        modalFormView.style.display = 'none';
        modalSuccessView.style.display = 'block';
      }

      setTimeout(() => {
        window.open(getWhatsAppLink(msg), '_blank');
      }, 500);
    });
  }

  // --- 4. FORMULÁRIO DE CONTATO RÁPIDO (#contato) ---
  const contactForm = document.getElementById('quick-contact-form');
  const contactFormContainer = document.getElementById('quick-contact-form-container');
  const contactSuccessView = document.getElementById('quick-contact-success');
  const contactResetBtn = document.getElementById('quick-contact-reset-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || '';
      const company = document.getElementById('contact-company')?.value || '';
      const email = document.getElementById('contact-email')?.value || '';
      const phone = document.getElementById('contact-phone')?.value || '';
      const eventType = document.getElementById('contact-event-type')?.value || 'Treinamentos e Workshops';

      const msg = `Olá! Gostaria de agendar uma visita técnica no Villa Mantova.\n\n` +
        `*Nome:* ${name}\n` +
        `*Empresa:* ${company}\n` +
        `*E-mail:* ${email}\n` +
        `*Telefone:* ${phone}\n` +
        `*Formato:* ${eventType}`;

      if (contactFormContainer && contactSuccessView) {
        contactForm.style.display = 'none';
        contactSuccessView.style.display = 'block';
      }

      setTimeout(() => {
        window.open(getWhatsAppLink(msg), '_blank');
      }, 500);
    });
  }

  if (contactResetBtn) {
    contactResetBtn.addEventListener('click', () => {
      if (contactForm && contactSuccessView) {
        contactForm.reset();
        contactForm.style.display = 'block';
        contactSuccessView.style.display = 'none';
      }
    });
  }

  // --- 5. FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Fecha outros itens para accordion limpo
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
          }
        });
        item.classList.toggle('open', !isOpen);
      });
    }
  });

  // --- 6. GALERIA & FILTROS & LIGHTBOX ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCat = document.getElementById('lightbox-cat');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  let currentVisibleItems = [...galleryItems];
  let currentImageIndex = 0;

  // Filtragem de Categorias
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'todos' || itemCat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      currentVisibleItems = galleryItems.filter(item => {
        const itemCat = item.getAttribute('data-category');
        return category === 'todos' || itemCat === category;
      });
    });
  });

  // Abrir Lightbox
  function openLightbox(index) {
    if (!lightbox || !currentVisibleItems[index]) return;
    currentImageIndex = index;
    const item = currentVisibleItems[index];

    const src = item.getAttribute('data-src');
    const title = item.getAttribute('data-title');
    const cat = item.getAttribute('data-cat-label');
    const desc = item.getAttribute('data-desc');

    if (lightboxImg) lightboxImg.src = src;
    if (lightboxCat) lightboxCat.textContent = cat;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    if (currentVisibleItems.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentVisibleItems.length;
    openLightbox(currentImageIndex);
  }

  function prevImage() {
    if (currentVisibleItems.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
    openLightbox(currentImageIndex);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = currentVisibleItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextImage);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevImage);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // --- 7. MODAL DE POLÍTICA DE PRIVACIDADE ---
  const privacyModal = document.getElementById('privacy-modal');
  const privacyCloseBtn = document.getElementById('privacy-close-btn');
  const privacyOpenLinks = document.querySelectorAll('[data-open-privacy]');

  function openPrivacyModal() {
    if (!privacyModal) return;
    privacyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePrivacyModal() {
    if (!privacyModal) return;
    privacyModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  privacyOpenLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyModal();
    });
  });

  if (privacyCloseBtn) {
    privacyCloseBtn.addEventListener('click', closePrivacyModal);
  }

  if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) {
        closePrivacyModal();
      }
    });
  }

  // --- 8. POPUP LGPD / COOKIES CONSENT ---
  const lgpdBanner = document.getElementById('lgpd-banner');
  const lgpdAcceptBtn = document.getElementById('lgpd-accept-btn');
  const LGPD_STORAGE_KEY = 'villa_mantova_lgpd_accepted';

  if (lgpdBanner && lgpdAcceptBtn) {
    if (!localStorage.getItem(LGPD_STORAGE_KEY)) {
      setTimeout(() => {
        lgpdBanner.classList.add('show');
      }, 1000);
    }

    lgpdAcceptBtn.addEventListener('click', () => {
      localStorage.setItem(LGPD_STORAGE_KEY, 'true');
      lgpdBanner.classList.remove('show');
    });
  }

  // --- 9. TECLAS DE ATALHO (ESC, SETAS) ---
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProposalModal();
      closePrivacyModal();
      closeLightbox();
    } else if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });
});
