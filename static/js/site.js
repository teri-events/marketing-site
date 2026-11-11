(() => {
  const header = document.querySelector('header');
  const menuButton = document.querySelector('[aria-controls="site-menu"]');
  const menu = document.getElementById('site-menu');
  const updateHeader = () => header?.classList.toggle('is-solid', scrollY > 16 || (menu && !menu.hidden));
  const setMenu = (open) => {
    if (!menu || !menuButton) return;
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? menuButton.dataset.closeLabel : menuButton.dataset.openLabel);
    updateHeader();
  };
  menuButton?.addEventListener('click', () => setMenu(menu.hidden));
  menu?.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  addEventListener('scroll', updateHeader, { passive: true });
  const desktop = matchMedia('(min-width: 768px)');
  desktop.addEventListener('change', () => { if (desktop.matches) setMenu(false); });
  updateHeader();

  const languages = document.querySelector('.language-switcher');
  document.addEventListener('click', (event) => {
    if (languages && !languages.contains(event.target)) languages.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (menu && !menu.hidden) { setMenu(false); menuButton.focus(); }
    if (languages?.open) { languages.open = false; languages.querySelector('summary').focus(); }
  });
  // Keep the current section when changing languages; retain the previous query-link convention.
  document.querySelectorAll('.language-switcher a').forEach((link) => {
    link.addEventListener('click', () => {
      link.hash = location.hash;
      try { localStorage.setItem('teri.lang', link.lang); } catch { /* storage is optional */ }
    });
  });
  const requested = new URLSearchParams(location.search).get('lang');
  if (requested && requested !== document.documentElement.lang) {
    const target = document.querySelector(`.language-switcher a[lang="${requested === 'am' ? 'am' : 'en'}"]`);
    if (target && ['am', 'en'].includes(requested)) location.replace(target.href + location.hash);
  }

  const questions = [...document.querySelectorAll('#faq button[aria-controls]')];
  function setQuestion(button, open) {
    button.setAttribute('aria-expanded', String(open));
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    answer.setAttribute('aria-hidden', String(!open));
    answer.style.gridTemplateRows = open ? '1fr' : '0fr';
    answer.inert = !open;
  }
  document.getElementById('faq')?.classList.add('faq-enhanced');
  questions.forEach((button, index) => {
    setQuestion(button, index === 0);
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      questions.forEach((other) => setQuestion(other, other === button && open));
    });
  });

  document.querySelector('[data-signup]')?.addEventListener('click', (event) => {
    const button = event.currentTarget;
    const region = document.querySelector('[aria-live="polite"]');
    if (!region) return;
    region.replaceChildren();
    const toast = document.createElement('div');
    toast.className = 'toast-in pointer-events-auto rounded-lg border border-border bg-background p-4 font-body text-[13px] text-foreground shadow-lift';
    toast.setAttribute('role', 'status');
    const title = document.createElement('p');
    title.className = 'font-medium';
    title.textContent = button.dataset.title;
    const body = document.createElement('p');
    body.className = 'mt-0.5 text-muted-foreground';
    body.textContent = button.dataset.description;
    toast.append(title, body);
    region.append(toast);
    setTimeout(() => toast.remove(), 4000);
  });

  // Content is visible by default. Only animate when the browser supports it.
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = (element) => {
    const { from, fade, tween, duration, delay } = JSON.parse(element.dataset.reveal);
    const initial = {}, final = {};
    if (fade) {
      initial.opacity = 0; final.opacity = 1;
      initial.transform = `translate(${from.x || 0}px, ${from.y || 0}px) scale(${from.scale ?? 1})`;
      final.transform = 'none';
    }
    for (const [key, [start, end]] of Object.entries(tween || {})) {
      initial[key] = start; final[key] = end;
    }
    Object.assign(element.style, final);
    if (!reduced && element.animate) element.animate([initial, final], {
      duration: duration * 1000, delay: delay * 1000,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards',
    });
  };
  const elements = document.querySelectorAll('[data-reveal]');
  // Apply final dimensions immediately, including decorative progress bars.
  elements.forEach((element) => {
    const { tween } = JSON.parse(element.dataset.reveal);
    for (const [key, values] of Object.entries(tween || {})) element.style[key] = values[1];
  });
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { reveal(target); observer.unobserve(target); }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    elements.forEach((element) => observer.observe(element));
  }
})();
