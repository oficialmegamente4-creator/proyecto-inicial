/* ============================================
  PUNNT CONVERSION — app.js
  Premium Agency Website
   ============================================ */

'use strict';

/* ============================================
  SPLASH SCREEN
   ============================================ */
(function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  // Oculta el splash después de que la barra de carga termine
  setTimeout(function () {
    splash.classList.add('hide');
    document.body.style.overflow = 'auto';
  }, 2600);

  // Bloquea scroll durante el splash
  document.body.style.overflow = 'hidden';
})();

/* ============================================
  NAVBAR — STICKY / SCROLL
  ============================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();

/* ============================================
  HAMBURGER / MOBILE MENU
   ============================================ */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Cierra con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ============================================
  SMOOTH SCROLL
   ============================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      var top = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

/* ============================================
   REVEAL ANIMATIONS (IntersectionObserver)
   ============================================ */
(function initReveal() {
  var elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Aplica delay desde data-delay
  elements.forEach(function (el) {
    var delay = el.getAttribute('data-delay');
    if (delay) {
      el.style.transitionDelay = parseInt(delay) + 'ms';
    }
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ============================================
  ANIMATED COUNTERS
   ============================================ */
(function initCounters() {
  var counters = document.querySelectorAll('.metric-num[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'));
    var duration = 2000;
    var start = null;
    var startVal = 0;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // Easing: ease-out cubic
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(startVal + (target - startVal) * ease);
      el.textContent = current.toLocaleString('es-CO');
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('es-CO');
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });
})();

/* ============================================
   FAQ ACCORDION
   ============================================ */
(function initFAQ() {
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Cierra todos
      faqItems.forEach(function (other) {
        var otherBtn = other.querySelector('.faq-question');
        var otherAns = other.querySelector('.faq-answer');
        if (otherBtn && otherAns) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.classList.remove('open');
        }
      });

      // Abre el actual si estaba cerrado
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
})();

/* ============================================
   CONTACT FORM → WHATSAPP
   ============================================ */
(function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var WA_NUMBER = '573053988180';

  function getVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function setError(fieldId, errorId, msg) {
    var field = document.getElementById(fieldId);
    var errEl = document.getElementById(errorId);
    if (field && field.parentElement) {
      field.parentElement.classList.toggle('has-error', !!msg);
    }
    if (errEl) errEl.textContent = msg || '';
  }

  function clearErrors() {
    ['fname', 'fphone', 'femail', 'fmessage'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.parentElement) {
        el.parentElement.classList.remove('has-error');
      }
    });
    ['fnameError', 'fphoneError', 'femailError', 'fmessageError'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var nombre = getVal('fname');
    var telefono = getVal('fphone');
    var email = getVal('femail');
    var servicio = getVal('fservice');
    var mensaje = getVal('fmessage');
    var valid = true;

    if (!nombre) {
      setError('fname', 'fnameError', 'Por favor ingresa tu nombre.');
      valid = false;
    }

    if (!telefono) {
      setError('fphone', 'fphoneError', 'Por favor ingresa tu teléfono.');
      valid = false;
    }

    if (!email || !validateEmail(email)) {
      setError('femail', 'femailError', 'Ingresa un correo electrónico válido.');
      valid = false;
    }

    if (!mensaje || mensaje.length < 10) {
      setError('fmessage', 'fmessageError', 'Por favor cuéntanos sobre tu proyecto (mínimo 10 caracteres).');
      valid = false;
    }

    if (!valid) return;

    // Construye mensaje para WhatsApp
    var servicioTxt = servicio ? '\nServicio de interés: ' + servicio : '';
    var wa_msg =
      '¡Hola! Envío mi solicitud desde la web de PUNNT CONVERSION.' +
      '\n\n*Nombre:* ' + nombre +
      '\n*Teléfono:* ' + telefono +
      '\n*Email:* ' + email +
      servicioTxt +
      '\n\n*Proyecto:*\n' + mensaje;

    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(wa_msg);
    window.open(url, '_blank', 'noopener,noreferrer');

    // Feedback visual
    var submitBtn = form.querySelector('.form-submit span');
    if (submitBtn) {
      submitBtn.textContent = '¡Enviando a WhatsApp...';
      setTimeout(function () {
        submitBtn.textContent = 'Enviar por WhatsApp';
      }, 3000);
    }

    form.reset();
  });
})();

/* ============================================
   CARDS HOVER TILT (Sutil)
   ============================================ */
(function initCardTilt() {
  var cards = document.querySelectorAll('.service-card, .portfolio-card, .plan-card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var dx = (x - cx) / cx;
      var dy = (y - cy) / cy;
      var rotX = -dy * 3;
      var rotY = dx * 3;
      card.style.transform = 'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();

/* ============================================
   LAZY LOADING de imágenes / iframes
   ============================================ */
(function initLazyLoad() {
  // Los iframes con loading="lazy" ya tienen soporte nativo en navegadores modernos
  // Para compatibilidad adicional, observamos manualmente
  var lazyIframes = document.querySelectorAll('iframe[loading="lazy"]');
  if (!('IntersectionObserver' in window)) return;

  var lazyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var iframe = entry.target;
        if (iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
        }
        lazyObserver.unobserve(iframe);
      }
    });
  }, { rootMargin: '200px' });

  lazyIframes.forEach(function (iframe) {
    lazyObserver.observe(iframe);
  });
})();

/* ============================================
   ACTIVE NAV LINK (Scroll Spy)
   ============================================ */
(function initScrollSpy() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();

/* ============================================
   SERVICE CARDS — stagger delay from data-delay
   ============================================ */
(function initServiceDelays() {
  var grid = document.querySelector('.services-grid');
  if (!grid) return;
  var cards = grid.querySelectorAll('.reveal[data-delay]');
  // Los delays son por fila. Recalculamos en función del ancho de pantalla.
  function applyDelays() {
    cards.forEach(function (card) {
      var delay = card.getAttribute('data-delay') || 0;
      card.style.transitionDelay = parseInt(delay) + 'ms';
    });
  }
  applyDelays();
  window.addEventListener('resize', applyDelays, { passive: true });
})();

/* ============================================
   CURSOR PERSONALIZADO (Desktop)
   ============================================ */
(function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Táctil: sin cursor

  var cursor = document.createElement('div');
  cursor.style.cssText = [
    'position:fixed',
    'width:10px',
    'height:10px',
    'border-radius:50%',
    'background:rgba(108,99,255,0.8)',
    'pointer-events:none',
    'z-index:99999',
    'transform:translate(-50%,-50%)',
    'transition:width 0.2s,height 0.2s,background 0.2s,opacity 0.2s',
    'mix-blend-mode:difference',
    'left:-20px',
    'top:-20px'
  ].join(';');
  document.body.appendChild(cursor);

  var cursorRing = document.createElement('div');
  cursorRing.style.cssText = [
    'position:fixed',
    'width:36px',
    'height:36px',
    'border-radius:50%',
    'border:1px solid rgba(108,99,255,0.35)',
    'pointer-events:none',
    'z-index:99998',
    'transform:translate(-50%,-50%)',
    'transition:width 0.35s,height 0.35s,border-color 0.2s,left 0.1s,top 0.1s',
    'left:-40px',
    'top:-40px'
  ].join(';');
  document.body.appendChild(cursorRing);

  var mx = -40, my = -40;
  var rx = -40, ry = -40;
  var raf = null;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';

    if (!raf) {
      raf = requestAnimationFrame(function tick() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top = ry + 'px';
        raf = requestAnimationFrame(tick);
      });
    }
  });

  // Efecto hover en elementos interactivos
  var interactives = document.querySelectorAll('a, button, .service-card, .portfolio-card, .plan-card, .faq-question');
  interactives.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      cursor.style.background = 'rgba(167,139,250,1)';
      cursorRing.style.width = '52px';
      cursorRing.style.height = '52px';
      cursorRing.style.borderColor = 'rgba(108,99,255,0.6)';
    });
    el.addEventListener('mouseleave', function () {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.background = 'rgba(108,99,255,0.8)';
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.borderColor = 'rgba(108,99,255,0.35)';
    });
  });
})();

/* ============================================
   PARALLAX HERO ORBS (sutil)
   ============================================ */
(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var orb1 = document.querySelector('.hero-orb-1');
  var orb2 = document.querySelector('.hero-orb-2');

  if (!orb1 || !orb2) return;

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    orb1.style.transform = 'translate(' + y * 0.04 + 'px, ' + y * 0.06 + 'px)';
    orb2.style.transform = 'translate(' + -y * 0.03 + 'px, ' + y * 0.04 + 'px)';
  }, { passive: true });
})();

/* ============================================
   STICKY NAV — active link highlight
   ============================================ */
(function addNavLinkStyles() {
  var style = document.createElement('style');
  style.textContent = '.nav-link.active { color: #fff; }';
  document.head.appendChild(style);
})();

/* ============================================
   PERFORMANCE: Preload fonts hint
   ============================================ */
(function prefetchLinks() {
  var prefetchUrls = [
    'https://wa.me/573053988180'
  ];
  prefetchUrls.forEach(function (url) {
    var link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
})();

/* ============================================
   INIT — Espera al DOM
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  // Todo ya inicializado arriba (IIFEs se ejecutan al cargar el script)
  // Aseguramos que los reveals iniciales se chequeen
  setTimeout(function () {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
});
/* ============================================
   CAPTURA Y ENVÍO DEL FORMULARIO DE CONTACTO
   ============================================ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Evitamos que la página se recargue

    // 1. Capturamos los valores ingresados por el usuario
    const nombre = document.getElementById('name') ? document.getElementById('name').value : '';
    const email = document.getElementById('email') ? document.getElementById('email').value : '';
    // Asegúrate de que en tu index.html el input de teléfono tenga id="phone" o id="telefono"
    const telefono = document.getElementById('phone') ? document.getElementById('phone').value : 'No proporcionado'; 
    const mensaje = document.getElementById('message') ? document.getElementById('message').value : '';

    // 2. Cambiar temporalmente el estado del botón para indicar que está procesando
    const btnSubmit = contactForm.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.textContent = 'Enviando...';
    btnSubmit.disabled = true;

    try {
      // 3. Enviamos los datos mediante una petición POST a nuestro backend del bot
      const response = await fetch('http://localhost:3000/api/formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre,
          telefono: telefono,
          email: email,
          mensaje: mensaje
        })
      });

      const resultado = await response.json();

      if (resultado.success) {
        alert(`¡Gracias ${nombre}! Tu solicitud ha sido enviada directamente a nuestro WhatsApp.`);
        contactForm.reset(); // Limpiamos los campos
      } else {
        alert('Hubo un inconveniente al procesar tu solicitud por WhatsApp. Por favor, inténtalo de nuevo.');
      }

    } catch (error) {
      console.error('Error de conexión con la API:', error);
      alert('Error de conexión. Asegúrate de tener el bot de Node.js encendido.');
    } finally {
      // 4. Restauramos el botón a su estado original
      btnSubmit.textContent = textoOriginal;
      btnSubmit.disabled = false;
    }
  });
}