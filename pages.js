/* Sub-page motion: Lenis on the GSAP ticker + gentle scroll reveals. Skipped entirely with reduced motion. */
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !window.gsap || !window.Lenis) return;
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -90, duration: 1.3 });
  }));

  // Hero intro
  const hero = document.querySelector(".case-hero, .projects-hero");
  if (hero) {
    const copy = hero.querySelectorAll(".back-link, .eyebrow, h1, .role, .hero-summary, .hero-actions, p");
    gsap.from(copy, { opacity: 0, y: 26, filter: "blur(8px)", duration: 1, ease: "expo.out", stagger: 0.07, delay: 0.1, clearProps: "filter" });
    const visual = hero.querySelector(".case-visual");
    if (visual) gsap.from(visual, { opacity: 0, y: 40, scale: 0.97, duration: 1.3, ease: "expo.out", delay: 0.35 });
  }
  gsap.from(".site-header", { opacity: 0, y: -20, duration: 0.8, ease: "expo.out" });

  // Section headings and cards
  document.querySelectorAll(".section-heading").forEach((h) =>
    gsap.from(h, { opacity: 0, y: 24, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%", once: true } }));
  ScrollTrigger.batch(".overview-grid article, .workflow-grid article, .gallery-grid figure, .project-card, .video-shell, .stack-panel", {
    start: "top 90%", once: true,
    onEnter: (els) => gsap.from(els, { opacity: 0, y: 36, duration: 0.9, ease: "expo.out", stagger: 0.06 }),
  });
})();
