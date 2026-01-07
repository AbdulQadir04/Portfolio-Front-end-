// script.js — Hardened for production use

const html = document.documentElement;
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const themeToggle = document.getElementById("themeToggle");
const styleToggle = document.getElementById("styleToggle");
const yearEl = document.getElementById("year");

yearEl && (yearEl.textContent = new Date().getFullYear());

// Mobile menu
menuBtn?.addEventListener("click", () => {
  menu.classList.toggle("open");
  menuBtn.setAttribute(
    "aria-expanded",
    String(menu.classList.contains("open"))
  );
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      menu?.classList.remove("open");
    }
  });
});

// Theme toggle
themeToggle?.addEventListener("click", () => {
  const next = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = next;
  localStorage.setItem("theme", next);
});
html.dataset.theme = localStorage.getItem("theme") || "light";

// Showcase toggle
styleToggle?.addEventListener("click", () => {
  const next = html.dataset.showcase === "1" ? "0" : "1";
  html.dataset.showcase = next;
  localStorage.setItem("showcase", next);
});
html.dataset.showcase = localStorage.getItem("showcase") || "1";
