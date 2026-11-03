const toggle = document.querySelector("#themeToggle");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const themeStorageKey = "siwar-portfolio-theme";

const updateThemeToggle = () => {
  if (!toggle) return;

  const isDark = document.body.classList.contains("dark");
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
};

try {
  if (localStorage.getItem(themeStorageKey) !== "light") {
    document.body.classList.add("dark");
  }
} catch {
  // Dark is the default theme, matching the home page, when storage is unavailable.
  document.body.classList.add("dark");
}

updateThemeToggle();

toggle?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");

  try {
    localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
  } catch {
    // The theme still works for the current page when storage is unavailable.
  }

  updateThemeToggle();
});

const sectionIds = navLinks.map((link) => link.getAttribute("href")).filter((href) => href?.startsWith("#"));
const sections = sectionIds.map((id) => document.querySelector(id)).filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] }
);

sections.forEach((section) => observer.observe(section));
