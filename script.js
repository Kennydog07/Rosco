// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  // Quote form: Netlify Forms, submitted in the background with an on-page confirmation.
  // Without JavaScript the form still posts normally and Netlify shows /thanks.html.
  const form = document.querySelector('.quote-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      button.disabled = true; button.textContent = 'Sending…';
      status.className = 'form-status';
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString()
        });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = 'Thanks, your request has been sent. Ross will be in touch to arrange your free estimate.';
        status.className = 'form-status ok';
      } catch (err) {
        status.innerHTML = 'Sorry, that didn\u2019t send. Please call <a href="tel:07580092896">07580 092 896</a> or email <a href="mailto:Rosco-pdm@outlook.com">Rosco-pdm@outlook.com</a>.';
        status.className = 'form-status err';
      } finally {
        button.disabled = false; button.textContent = 'Send request';
      }
    });
  }

  // Facebook review embeds: scale the fixed 500px iframe to fit its card
  const fbWraps = document.querySelectorAll('.fb-review-wrap');
  const fitFb = () => fbWraps.forEach((wrap) => {
    const frame = wrap.querySelector('iframe');
    if (!frame) return;
    const w = wrap.clientWidth;
    const scale = Math.min(1, w / 500);
    frame.style.transform = scale < 1 ? `scale(${scale})` : '';
    frame.style.marginLeft = scale < 1 ? '0' : `${(w - 500) / 2}px`;
    wrap.style.height = `${Number(frame.getAttribute('height')) * scale + 2}px`;
  });
  if (fbWraps.length) { fitFb(); window.addEventListener('resize', fitFb); }

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
