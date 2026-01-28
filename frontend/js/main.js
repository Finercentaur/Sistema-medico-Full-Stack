/* ===================================
   MAIN.JS - SCRIPT PRINCIPAL
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
  CONFIG.log('Sistema Médico - Aplicación iniciada', {
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  // ===================================
  // 1. BOTÓN SCROLL TO TOP
  // ===================================

  const scrollToTopBtn = document.getElementById('scroll-to-top');

  if (scrollToTopBtn) {
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    // Scroll suave al top
    scrollToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // ===================================
  // 2. FORMULARIO DE CONSULTA DE RESULTADOS
  // ===================================

  const resultsForm = document.getElementById('results-form');

  if (resultsForm) {
    resultsForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const ticketInput = document.getElementById('ticket-number');
      const ticketNumber = ticketInput.value.trim().toUpperCase();

      // Validación básica
      if (!ticketNumber) {
        showNotification('Por favor, ingresa un número de folio', 'error');
        ticketInput.focus();
        return;
      }

      // Validar formato (RSV o OPC seguido de números)
      const ticketPattern = /^(RSV|OPC)\d{6,}$/;

      if (!ticketPattern.test(ticketNumber)) {
        showNotification(
          'Formato de folio inválido. Debe ser RSV123456 o OPC789012',
          'error'
        );
        ticketInput.focus();
        return;
      }

      // Simulación de búsqueda (por ahora sin backend)
      showNotification('Buscando resultados...', 'info');

      // Simular delay de búsqueda
      setTimeout(() => {
        // Redirigir a página de resultados con el ticket
        window.location.href = `resultados.html?ticket=${ticketNumber}`;
      }, 1500);
    });
  }

  // ===================================
  // 3. ANIMACIÓN DE ENTRADA DE ELEMENTOS
  // ===================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos que queremos animar
  const animatedElements = document.querySelectorAll(
    '.service-card, .why-us-card, .testimonial-card'
  );
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // ===================================
  // 4. HERO SCROLL INDICATOR
  // ===================================

  const heroScroll = document.querySelector('.hero-scroll');

  if (heroScroll) {
    heroScroll.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  }

  // ===================================
  // 5. SMOOTH SCROLL PARA TODOS LOS ENLACES INTERNOS
  // ===================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignorar # solo (ir al top)
      if (href === '#') return;

      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navbar = document.getElementById('navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ===================================
  // 6. LAZY LOADING DE IMÁGENES
  // ===================================

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===================================
  // 7. PREVENIR ENVÍO DE FORMULARIOS VACÍOS
  // ===================================

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (!isValid) {
        e.preventDefault();
        showNotification(
          'Por favor, completa todos los campos requeridos',
          'error'
        );
      }
    });
  });

  CONFIG.log('Main script initialized');
});

// ===================================
// FUNCIONES DE UTILIDAD
// ===================================

/**
 * Mostrar notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo: 'success', 'error', 'info', 'warning'
 */
function showNotification(message, type = 'info') {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Estilos inline
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${getNotificationColor(type)};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        font-size: 14px;
        font-weight: 500;
    `;

  // Agregar al body
  document.body.appendChild(notification);

  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

/**
 * Obtener color según tipo de notificación
 */
function getNotificationColor(type) {
  const colors = {
    success: '#27ae60',
    error: '#e74c3c',
    info: '#3498db',
    warning: '#f39c12',
  };
  return colors[type] || colors.info;
}

/**
 * Formatear número de teléfono
 * @param {string} phone - Número de teléfono
 * @returns {string} Teléfono formateado
 */
function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
function isValidEmail(email) {
  return CONFIG.VALIDATION.EMAIL_REGEX.test(email);
}

/**
 * Debounce function
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Agregar animaciones CSS para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #e74c3c !important;
        background-color: #fee;
    }
`;
document.head.appendChild(style);

CONFIG.log('Utility functions loaded');
