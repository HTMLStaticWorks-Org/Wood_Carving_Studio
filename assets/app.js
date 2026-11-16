// Wood & Grain Studio - Interactive Application Scripts

const root = document.documentElement;

// Theme Toggle
const savedTheme = localStorage.getItem('wcs-theme');
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('wcs-theme', nextTheme);
  });
});

// RTL Toggle
if (localStorage.getItem('wcs-rtl') === '1') {
  document.body.classList.add('rtl');
  root.setAttribute('dir', 'rtl');
}

document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const isRtl = document.body.classList.toggle('rtl');
    root.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    localStorage.setItem('wcs-rtl', isRtl ? '1' : '0');
  });
});

// Mobile Navigation Toggle
document.querySelectorAll('[data-menu-toggle]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const nav = document.querySelector('.navlinks');
    if (nav) {
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    }
  });
});

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 920) {
    document.querySelector('.navlinks')?.classList.remove('open');
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.navlinks');
  const toggle = document.querySelector('[data-menu-toggle]');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && !toggle?.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// Dynamic Year
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Floating Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Password Visibility Toggle
document.querySelectorAll('.password-toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('.password-wrap');
    const input = wrap ? wrap.querySelector('input') : null;
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    btn.innerHTML = isPassword
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  });
});

// Demo Form Submissions
document.querySelectorAll('form[data-demo-form]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your submission has been received. Our master carvers will get in touch with you shortly.');
  });
});

// Product Filter Pills
document.querySelectorAll('[data-filter]').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const category = pill.getAttribute('data-filter');
    document.querySelectorAll('[data-category]').forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Terms and Conditions & Privacy Dialogs
document.querySelectorAll('[data-terms-trigger]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Wood & Grain Studio — Terms & Conditions:\n\n1. Artisan Craftsmanship: All wood carvings are hand-chiseled from sustainably harvested timber.\n2. Custom Commissions: Dimensions, species and relief depth are approved via detailed sketches.\n3. Care & Maintenance: We provide complimentary care guides and beeswax balm with every order.\n4. Client Account: Your personal data and saved commission briefs are strictly confidential.");
  });
});

document.querySelectorAll('[data-privacy-trigger]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Wood & Grain Studio — Privacy Policy:\n\nYour privacy is respected. Client contact details and project briefs are securely stored and never shared with third parties.");
  });
});
