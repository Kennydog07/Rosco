// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Quote form → mailto
  const form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || '';
      const service = form.querySelector('[name="service"]')?.value || '';
      const message = form.querySelector('[name="message"]')?.value || '';
      const subject = encodeURIComponent(`Quote request — ${service || 'Painting & Decorating'}`);
      const body = encodeURIComponent(`Name: ${name}\nService: ${service}\n\n${message}`);
      window.location.href = `mailto:Rosco-pdm@outlook.com?subject=${subject}&body=${body}`;
    });
  }

  // ---- Slideshow ----
  const slides = document.querySelectorAll('.slideshow-slide');
  const dots   = document.querySelectorAll('.slideshow-dots button');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 4500);
  }

  // Init
  slides[0].classList.add('active');
  dots[0]?.classList.add('active');
  startTimer();

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  // Pause on hover
  const stage = document.querySelector('.slideshow');
  if (stage) {
    stage.addEventListener('mouseenter', () => clearInterval(timer));
    stage.addEventListener('mouseleave', startTimer);
  }
});
