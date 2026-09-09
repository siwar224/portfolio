const toggle = document.querySelector("#themeToggle");
const navLinks = [...document.querySelectorAll(".nav-links a")];

toggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
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
