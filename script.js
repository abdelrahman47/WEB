const sliderEl = document.querySelector('.hero__slider');
const slides = sliderEl ? Array.from(sliderEl.querySelectorAll('.hero__slide')) : [];
const dots = sliderEl ? Array.from(sliderEl.querySelectorAll('.hero__dot')) : [];
const prevBtn = document.querySelector('.hero__nav--prev');
const nextBtn = document.querySelector('.hero__nav--next');
const navbarToggle = document.querySelector('.navbar__toggle');
const navbarLinks = document.querySelector('.navbar__links');
const yearEl = document.getElementById('year');
const pageLoader = document.querySelector('.page-loader');

let currentSlide = 0;
let slideInterval;

// Hide page loader when page is fully loaded
window.addEventListener('load', () => {
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
    }, 500);
  }
});

function showSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startAutoplay() {
  stopAutoplay();
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 6000);
}

function stopAutoplay() {
  clearInterval(slideInterval);
}

if (slides.length && dots.length) {
  startAutoplay();

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      showSlide(parseInt(dot.dataset.slide, 10));
      startAutoplay();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoplay();
      showSlide(currentSlide - 1);
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoplay();
      showSlide(currentSlide + 1);
      startAutoplay();
    });
  }

  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAutoplay);
    sliderEl.addEventListener('mouseleave', startAutoplay);
  }
}

if (navbarToggle && navbarLinks) {
  navbarToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('is-open');
    const isOpen = navbarLinks.classList.contains('is-open');
    navbarToggle.setAttribute('aria-expanded', isOpen.toString());
    document.body.classList.toggle('menu-open', isOpen);
  });

  navbarLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navbarLinks.classList.remove('is-open');
      navbarToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Scroll reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
  observer.observe(el);
});
