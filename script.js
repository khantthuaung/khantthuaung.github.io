const year = String(new Date().getFullYear());
document.querySelectorAll("#year, .current-year").forEach((element) => {
  element.textContent = year;
});

// Theme preference follows the system until the visitor chooses a mode.
const themeToggle = document.querySelector(".theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let selectedTheme = null;
try {
  selectedTheme = localStorage.getItem("portfolio-theme");
} catch (_) {}
if (!["light", "dark"].includes(selectedTheme)) selectedTheme = null;
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content =
    theme === "dark" ? "#15171B" : "#F3F1EB";
  themeToggle.setAttribute("aria-checked", String(theme === "dark"));
  themeToggle.title = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
}
applyTheme(selectedTheme || (systemTheme.matches ? "dark" : "light"));
themeToggle.hidden = false;
themeToggle.addEventListener("click", () => {
  selectedTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(selectedTheme);
  try {
    localStorage.setItem("portfolio-theme", selectedTheme);
  } catch (_) {}
});
systemTheme.addEventListener("change", (event) => {
  if (!selectedTheme) applyTheme(event.matches ? "dark" : "light");
});

// The mobile menu is a disclosure; desktop links are always visible.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");
const mobileLayout = window.matchMedia("(max-width: 800px)");
function setMenuOpen(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  navigation.hidden = mobileLayout.matches && !open;
}
function syncNavigation() {
  menuToggle.hidden = !mobileLayout.matches;
  setMenuOpen(false);
}
menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a") && mobileLayout.matches) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
mobileLayout.addEventListener("change", syncNavigation);
syncNavigation();

// Reflect the section currently being read in the navigation.
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    sectionLinks.forEach((link) => {
      if (link.hash === `#${visible.target.id}`)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  },
  { rootMargin: "-10% 0px -45% 0px" },
);
sectionLinks.forEach((link) => {
  const section = document.querySelector(link.hash);
  if (section) sectionObserver.observe(section);
});
