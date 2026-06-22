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

  // Quote form: static site, no backend — guide the user to email/call instead
  const form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || '';
      const service = form.querySelector('[name="service"]')?.value || '';
      const message = form.querySelector('[name="message"]')?.value || '';
      const subject = encodeURIComponent(`Quote request — ${service || 'Painting & Decorating'}`);
      const body = encodeURIComponent(
        `Name: ${name}\nService: ${service}\n\n${message}`
      );
      window.location.href = `mailto:Rosco-pdm@outlook.com?subject=${subject}&body=${body}`;
    });
  }
});
