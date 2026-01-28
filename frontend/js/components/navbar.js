/* ===================================
   NAVBAR - FUNCIONALIDAD
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
  // Elementos del DOM
  const navbar = document.getElementById('navbar');
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbarMenu = document.getElementById('navbar-menu');
  const navbarLinks = document.querySelectorAll('.navbar-link');

  // ===================================
  // 1. NAVBAR CON SCROLL
  // ===================================

  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    // Agregar clase 'scrolled' cuando se hace scroll
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ===================================
  // 2. TOGGLE MENU MÓVIL
  // ===================================

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function () {
      // Toggle de clases activas
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');

      // Prevenir scroll del body cuando el menú está abierto
      if (navbarMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // ===================================
  // 3. CERRAR MENÚ AL HACER CLICK EN LINK
  // ===================================

  navbarLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Cerrar menú en móvil
      if (navbarMenu.classList.contains('active')) {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ===================================
  // 4. CERRAR MENÚ AL HACER CLICK FUERA
  // ===================================

  document.addEventListener('click', function (event) {
    const isClickInsideMenu = navbarMenu.contains(event.target);
    const isClickOnToggle = navbarToggle.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnToggle &&
      navbarMenu.classList.contains('active')
    ) {
      navbarToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ===================================
  // 5. HIGHLIGHT LINK ACTIVO AL HACER SCROLL
  // ===================================

  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remover clase active de todos los links
        navbarLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Agregar clase active al link correspondiente
        const activeLink = document.querySelector(
          `.navbar-link[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);

  // ===================================
  // 6. SMOOTH SCROLL PARA ANCLAS
  // ===================================

  navbarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Solo aplicar smooth scroll si es un ancla (#)
      if (href && href.startsWith('#')) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  CONFIG.log('Navbar initialized', {
    links: navbarLinks.length,
    sections: sections.length,
  });
});
