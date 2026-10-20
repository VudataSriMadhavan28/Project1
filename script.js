/* Theme toggle and small progressive enhancements. */
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const icon = document.querySelector('.theme-icon');
  const savedTheme = (() => { try { return localStorage.getItem('madhavan-theme'); } catch { return null; } })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme) {
    if (theme === 'dark') root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    if (toggle && icon) {
      const dark = theme === 'dark';
      icon.textContent = dark ? '☀' : '☾';
      toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      toggle.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('madhavan-theme', next); } catch { /* Storage may be unavailable; theme still works. */ }
  });

  document.querySelectorAll('#current-year').forEach((node) => { node.textContent = String(new Date().getFullYear()); });

  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const status = document.querySelector('#form-status');
    if (status) status.textContent = 'Opening your email app with the message prepared. Add the recipient address before sending.';
    // Replace the placeholder recipient with your preferred email before publishing.
    window.location.href = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
