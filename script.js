// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("active");
    nav.style.display = nav.classList.contains("active") ? "flex" : "none";
  });
}

// ========== SCROLL REVEAL ==========
const sections = document.querySelectorAll(".section");
const revealOnScroll = () => {
  const triggerPoint = window.innerHeight * 0.85;
  sections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;
    if (top < triggerPoint) sec.classList.add("inview");
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('.nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth < 880 && nav) {
      nav.classList.remove("active");
      nav.style.display = "none";
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// ========== DYNAMIC YEAR ==========
const yearSpan = document.querySelector(".year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ========== PHOTO GLOW EFFECT ==========
const photoBox = document.getElementById("photoBox");
if (photoBox) {
  photoBox.addEventListener("click", (e) => {
    e.stopPropagation();
    photoBox.classList.add("glow");
    setTimeout(() => photoBox.classList.remove("glow"), 1200);
  });
}

// ========== PAGE GLOW EFFECT ==========
document.addEventListener("click", () => {
  document.body.classList.add("glow-active");
  setTimeout(() => document.body.classList.remove("glow-active"), 2000);
});

// =====================================================
// THEME SWITCHER (8 themes) - UI & logic
// =====================================================
const themeToggle = document.getElementById("themeToggle");
const themePanel = document.getElementById("themePanel");
const swatches = Array.from(document.querySelectorAll(".theme-swatch"));
const themeReset = document.getElementById("themeReset");
const STORAGE_KEY = "selectedTheme";

// open/close panel
if (themeToggle && themePanel) {
  themeToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    themePanel.classList.toggle("active");
    themePanel.setAttribute("aria-hidden", themePanel.classList.contains("active") ? "false" : "true");
  });
}

// apply saved theme on load
const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  document.body.classList.add(saved);
  // mark active swatch
  swatches.forEach(s => s.classList.toggle("active", s.dataset.theme === saved));
}

// swatch click
swatches.forEach(s => {
  s.addEventListener("click", (e) => {
    const themeName = s.dataset.theme;
    if (!themeName) return;
    // remove existing theme-* classes
    document.body.className = document.body.className.split(" ").filter(cl => !cl.startsWith("theme-")).join(" ");
    document.body.classList.add(themeName);
    localStorage.setItem(STORAGE_KEY, themeName);
    // active visuals
    swatches.forEach(x => x.classList.remove("active"));
    s.classList.add("active");
    // close panel
    themePanel.classList.remove("active");
    themePanel.setAttribute("aria-hidden", "true");
  });
});

// reset
if (themeReset) {
  themeReset.addEventListener("click", (e) => {
    localStorage.removeItem(STORAGE_KEY);
    // remove theme-* classes
    document.body.className = document.body.className.split(" ").filter(cl => !cl.startsWith("theme-")).join(" ");
    swatches.forEach(s => s.classList.remove("active"));
    themePanel.classList.remove("active");
    themePanel.setAttribute("aria-hidden", "true");
  });
}

// close panel when clicking outside
document.addEventListener("click", (e) => {
  if (!themePanel.contains(e.target) && e.target !== themeToggle && themePanel.classList.contains("active")) {
    themePanel.classList.remove("active");
    themePanel.setAttribute("aria-hidden", "true");
  }
});

// keyboard support: Esc closes panel
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && themePanel.classList.contains("active")) {
    themePanel.classList.remove("active");
    themePanel.setAttribute("aria-hidden", "true");
  }
});
