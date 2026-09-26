const year = String(new Date().getFullYear());
document.querySelectorAll("#year, .current-year").forEach((element) => {
  element.textContent = year;
});

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
    theme === "dark" ? "#141412" : "#F0F2ED";
  themeToggle.textContent = theme === "dark" ? "☀ Light" : "☾ Dark";
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
  );
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
