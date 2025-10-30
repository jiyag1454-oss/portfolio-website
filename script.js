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
// PREMIUM THEME SWITCHER (Glass UI + Animated Toggle)
// =====================================================
const toggleBtn = document.querySelector(".theme-toggle");
const switcher = document.createElement("div");
switcher.classList.add("theme-switcher");
document.body.appendChild(switcher);

const themes = [
  { primary: "#6A0DAD", secondary: "#B19CD9", accent: "#C0C0C0", bg: "#F8F8FF" }, // Royal Purple
  { primary: "#D63384", secondary: "#FFB6C1", accent: "#FFD700", bg: "#FFF8FB" }, // Pink Gold
  { primary: "#0047AB", secondary: "#87CEFA", accent: "#FFBF00", bg: "#F0F8FF" }, // Sky Royal
  { primary: "#228B22", secondary: "#90EE90", accent: "#FFD700", bg: "#F9FFF9" }, // Fresh Green
  { primary: "#FF4500", secondary: "#FFDAB9", accent: "#8B0000", bg: "#FFF9F5" }, // Sunset Flame
  { primary: "#191970", secondary: "#9370DB", accent: "#E0E0E0", bg: "#F9F9FF" }, // Midnight Purple
  { primary: "#FF1493", secondary: "#FFB6C1", accent: "#FFD700", bg: "#FFF9FB" }, // Barbie Pink
  { primary: "#008080", secondary: "#40E0D0", accent: "#FFD700", bg: "#F0FFFF" }  // Teal Glow
];

// Create color buttons
themes.forEach((t) => {
  const btn = document.createElement("div");
  btn.className = "theme-btn";
  btn.style.background = `linear-gradient(135deg, ${t.primary}, ${t.secondary})`;
  btn.addEventListener("click", () => {
    document.documentElement.style.setProperty("--primary", t.primary);
    document.documentElement.style.setProperty("--secondary", t.secondary);
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--bg", t.bg);
    localStorage.setItem("themeColor", JSON.stringify(t));
  });
  switcher.appendChild(btn);
});

// Apply saved theme on load
const savedTheme = localStorage.getItem("themeColor");
if (savedTheme) {
  const t = JSON.parse(savedTheme);
  document.documentElement.style.setProperty("--primary", t.primary);
  document.documentElement.style.setProperty("--secondary", t.secondary);
  document.documentElement.style.setProperty("--accent", t.accent);
  document.documentElement.style.setProperty("--bg", t.bg);
}

// Toggle animation + icon switch
toggleBtn.addEventListener("click", () => {
  const isOpen = switcher.classList.toggle("show");
  toggleBtn.textContent = isOpen ? "❌" : "🎨";
  toggleBtn.setAttribute("aria-label", isOpen ? "Close theme panel" : "Open theme panel");
});

// Close switcher on outside click
document.addEventListener("click", (e) => {
  if (!switcher.contains(e.target) && e.target !== toggleBtn && switcher.classList.contains("show")) {
    switcher.classList.remove("show");
    toggleBtn.textContent = "🎨";
  }
});

// Keyboard support (ESC to close)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && switcher.classList.contains("show")) {
    switcher.classList.remove("show");
    toggleBtn.textContent = "🎨";
  }
});
