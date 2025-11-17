/* ============================================
   POWER LINK - LANDING PAGE JAVASCRIPT
   Animações, Interações e Efeitos
   ============================================ */

// ============================================
// NAVBAR - Scroll Effect e Mobile Menu
// ============================================
(function() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Smooth scroll for anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
})();

// ============================================
// ANIMAÇÕES NO SCROLL
// ============================================
(function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          element.classList.add('animated');
        }, delay * 1000);
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observar todos os elementos com data-animate
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
})();

// ============================================
// LIGHTBOX PARA GALERIA
// ============================================
(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const galleryImages = document.querySelectorAll('.gallery-image[data-lightbox]');
  
  let currentImageIndex = 0;
  const images = Array.from(galleryImages);

  // Abrir lightbox
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentImageIndex = index;
      openLightbox();
      updateLightboxImage();
    });
  });

  function openLightbox() {
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    if (images[currentImageIndex]) {
      lightboxImage.src = images[currentImageIndex].src;
      lightboxImage.alt = images[currentImageIndex].alt;
    }
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  // Event listeners
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
  }

  // Fechar ao clicar no overlay
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navegação com teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
    }
  });
})();

// ============================================
// BEFORE-AFTER SLIDER
// ============================================
(function() {
  const container = document.getElementById('beforeAfter');
  const slider = document.getElementById('beforeAfterSlider');
  const afterImage = container.querySelector('.after-image');
  const handle = slider.querySelector('.slider-handle');
  
  if (!container || !slider || !afterImage) return;

  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  function updateSlider(x) {
    const rect = container.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    
    slider.style.left = `${percentage}%`;
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  }

  function handleStart(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    container.style.cursor = 'col-resize';
    e.preventDefault();
  }

  function handleMove(e) {
    if (!isDragging) return;
    
    currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    updateSlider(currentX);
  }

  function handleEnd() {
    isDragging = false;
    container.style.cursor = '';
  }

  // Mouse events
  container.addEventListener('mousedown', handleStart);
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('mouseup', handleEnd);

  // Touch events
  container.addEventListener('touchstart', handleStart);
  document.addEventListener('touchmove', handleMove);
  document.addEventListener('touchend', handleEnd);

  // Inicializar na posição 50%
  updateSlider(container.getBoundingClientRect().left + container.offsetWidth / 2);
})();

// ============================================
// MICROINTERAÇÕES E EFEITOS
// ============================================

// Efeito parallax suave no hero
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = hero.querySelector('.hero-content');
    
    if (scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });
})();

// Efeito de hover nos cards
(function() {
  const cards = document.querySelectorAll('.problema-card, .feature-card, .equipe-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
})();

// Animação de números (se houver estatísticas)
(function() {
  const counters = document.querySelectorAll('[data-count]');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
})();

// Efeito de typing no hero (opcional)
(function() {
  const typingElement = document.querySelector('.hero-subtitle[data-typing]');
  if (!typingElement) return;
  
  const text = typingElement.textContent;
  typingElement.textContent = '';
  let index = 0;
  
  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50);
    }
  }
  
  // Iniciar quando o elemento estiver visível
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      type();
      observer.disconnect();
    }
  });
  
  observer.observe(typingElement);
})();

// ============================================
// PERFORMANCE - Lazy Loading de Imagens
// ============================================
(function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
})();

// ============================================
// SMOOTH SCROLL PARA TODOS OS LINKS ÂNCORA
// ============================================
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
})();

// ============================================
// EFEITO DE PARTÍCULAS NO HERO (Opcional)
// ============================================
(function() {
  const particlesContainer = document.querySelector('.hero-particles');
  if (!particlesContainer) return;
  
  // As partículas são criadas via CSS, mas podemos adicionar interatividade aqui
  // Por exemplo, partículas que seguem o mouse
})();

// ============================================
// VALIDAÇÃO E FEEDBACK DE FORMULÁRIOS (se houver)
// ============================================
(function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      // Adicionar validação personalizada aqui se necessário
    });
  });
})();

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Power Link Landing Page - Carregado com sucesso!');
  
  // Adicionar classe para animações após carregamento
  document.body.classList.add('loaded');
  
  // Preload de imagens críticas
  const criticalImages = [
    'imagem1.jpeg',
    'imagem2.jpeg',
    'logopowerlink.png'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
});

// ============================================
// UTILITÁRIOS
// ============================================

// Debounce function para otimizar eventos
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

// Throttle function para limitar execuções
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Aplicar throttle no scroll para melhor performance
window.addEventListener('scroll', throttle(() => {
  // Eventos de scroll otimizados aqui
}, 16)); // ~60fps

