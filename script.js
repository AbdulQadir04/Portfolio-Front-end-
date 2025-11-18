// script.js — Hybrid behavior: menu, theme/style toggles, lazy, tilt, scroll-spy

const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const themeToggle = document.getElementById('themeToggle');
const styleToggle = document.getElementById('styleToggle');
const html = document.documentElement;
const yearEl = document.getElementById('year');
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Set current year
yearEl && (yearEl.textContent = new Date().getFullYear());

// ---------- Mobile Menu Toggle ----------
const toggleMenu = () => {
  const isOpen = menu.style.display === 'flex';
  menu.style.display = isOpen ? 'none' : 'flex';
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
};

menuBtn?.addEventListener('click', toggleMenu);

document.addEventListener('click', e => {
  if (window.innerWidth <= 900 && menu.style.display === 'flex') {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) toggleMenu();
  }
});

// ---------- Smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.innerWidth <= 900 && menu) toggleMenu();
    }
  });
});

// ---------- Theme Toggle ----------
const initTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);
  themeToggle.textContent = html.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
};
themeToggle?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});
initTheme();

// ---------- Showcase Toggle ----------
const initShowcase = () => {
  const savedShow = localStorage.getItem('showcase');
  if (savedShow !== null) html.setAttribute('data-showcase', savedShow);
  styleToggle.setAttribute('aria-pressed', html.getAttribute('data-showcase') === '1');
};
styleToggle?.addEventListener('click', () => {
  const on = html.getAttribute('data-showcase') === '1';
  html.setAttribute('data-showcase', on ? '0' : '1');
  localStorage.setItem('showcase', on ? '0' : '1');
  styleToggle.setAttribute('aria-pressed', String(!on));
});
initShowcase();

// ---------- Lazy images ----------
document.querySelectorAll('img.lazy').forEach(img => {
  img.complete ? img.classList.add('loaded') : img.addEventListener('load', () => img.classList.add('loaded'));
});

// ---------- Hero Tilt ----------
const visualWrap = document.getElementById('visualWrap');
const heroVisual = document.querySelector('.hero-visual');
if (visualWrap && heroVisual && 'onmousemove' in window) {
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    heroVisual.addEventListener('mousemove', e => {
      const rect = visualWrap.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
      visualWrap.style.transform = `rotateY(${dx*6}deg) rotateX(${dy*-6}deg) translateZ(6px)`;
    });
    heroVisual.addEventListener('mouseleave', () => visualWrap.style.transform = '');
  }
}

// ---------- Scroll Spy ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if (sections.length && navLinks.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(n => n.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  }, { threshold: 0.48 });
  sections.forEach(s => obs.observe(s));
}

// ---------- Scroll Up Button ----------
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("show", window.scrollY > 250);
});
scrollTopBtn.addEventListener("click", () => window.scrollTo({ top:0, behavior:'smooth' }));

// ---------- Scroll Down ----------
document.querySelector(".scroll-down")?.addEventListener("click", () => {
  document.querySelector(".section")?.scrollIntoView({ behavior:'smooth' });
});

// Show document (prevent FOUC)
document.documentElement.style.visibility = 'visible';
