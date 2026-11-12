const params = new URLSearchParams(location.search);
const RM = params.get("rm") === "1" || matchMedia("(prefers-reduced-motion: reduce)").matches;
if (RM) document.body.classList.add("rm");
const FINE = matchMedia("(pointer: fine)").matches;
const css = (n) => getComputedStyle(document.body).getPropertyValue(n).trim();
const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
history.scrollRestoration = "manual";

/* ---------- Theme (same storage key as the live site) ---------- */
const toggle = document.getElementById("themeToggle");
const KEY = "siwar-portfolio-theme";
try { if (localStorage.getItem(KEY) === "light") document.body.classList.add("light"); } catch {}
if (params.get("light") === "1") document.body.classList.add("light");
toggle.addEventListener("click", () => {
  const light = document.body.classList.toggle("light");
  try { localStorage.setItem(KEY, light ? "light" : "dark"); } catch {}
  setFluidColors();
});

/* ---------- Lenis ↔ GSAP ticker ---------- */
gsap.registerPlugin(ScrollTrigger);
let lenis;
if (!RM) {
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
  const t = document.querySelector(a.getAttribute("href")); if (!t) return;
  e.preventDefault(); lenis ? lenis.scrollTo(t, { duration: 1.4 }) : t.scrollIntoView();
}));

/* ---------- Animated fluid background (WebGL) ---------- */
const cv = document.getElementById("fluid");
const gl = cv.getContext("webgl", { antialias: false });
let setFluidColors = () => {};
if (gl) {
  const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const fs = `precision highp float;
  uniform float t; uniform vec2 res, m; uniform vec3 c1,c2,c3,bg;
  float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
    return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.02+vec2(1.7,9.2);a*=.5;}return v;}
  void main(){
    vec2 uv=gl_FragCoord.xy/res; vec2 p=uv*vec2(res.x/res.y,1.)*1.8;
    p+=(m-.5)*.35;
    vec2 q=vec2(fbm(p+vec2(0.,t*.09)), fbm(p+vec2(5.2,1.3)-t*.07));
    vec2 r=vec2(fbm(p+2.4*q+vec2(1.7,9.2)+t*.11), fbm(p+2.4*q+vec2(8.3,2.8)-t*.08));
    float f=fbm(p+2.6*r);
    vec3 col=bg;
    col=mix(col,c1,smoothstep(.3,.95,f*f*2.2)*.7);
    col=mix(col,c2,smoothstep(.55,1.,length(q))*.45);
    col=mix(col,c3,smoothstep(.45,.8,r.x*r.y*1.4)*.3);
    float d=distance(uv*vec2(res.x/res.y,1.), m*vec2(res.x/res.y,1.));
    col+=c2*.10*exp(-d*d*9.);
    col=mix(bg,col,smoothstep(0.,.55,uv.y)*.9+.1);
    gl_FragColor=vec4(col,1.);
  }`;
  const sh = (ty, s) => { const x = gl.createShader(ty); gl.shaderSource(x, s); gl.compileShader(x); return x; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(pr); gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const L = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(L); gl.vertexAttribPointer(L, 2, gl.FLOAT, false, 0, 0);
  const U = (k) => gl.getUniformLocation(pr, k);
  const mouse = { x: .5, y: .6 }, sm = { x: .5, y: .6 };
  const draw = (time) => {
    sm.x += (mouse.x - sm.x) * .03; sm.y += (mouse.y - sm.y) * .03;
    gl.uniform1f(U("t"), time / 1000); gl.uniform2f(U("res"), cv.width, cv.height); gl.uniform2f(U("m"), sm.x, sm.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  setFluidColors = () => {
    gl.uniform3fv(U("c1"), hexRgb(css("--accent"))); gl.uniform3fv(U("c2"), hexRgb(css("--accent-2")));
    gl.uniform3fv(U("c3"), hexRgb(css("--accent-3"))); gl.uniform3fv(U("bg"), hexRgb(css("--bg")));
    if (RM) draw(8000);
  };
  addEventListener("pointermove", (e) => { mouse.x = e.clientX / innerWidth; mouse.y = 1 - e.clientY / innerHeight; });
  const size = () => { const d = Math.min(devicePixelRatio, 1) * .75; cv.width = cv.clientWidth * d; cv.height = cv.clientHeight * d; gl.viewport(0, 0, cv.width, cv.height); if (RM) draw(8000); };
  size(); addEventListener("resize", size); setFluidColors();
  let vis = true; new IntersectionObserver(([e]) => (vis = e.isIntersecting)).observe(cv);
  if (!RM) gsap.ticker.add((t) => vis && draw(t * 1000));
}

/* ---------- React Bits — Blur Text (hero title) ---------- */
const h1 = document.getElementById("hero-title");
const text = h1.textContent;
h1.setAttribute("aria-label", text);
h1.innerHTML = text.split(" ").map((word) => `<span class="word" aria-hidden="true">${
  [...word].map((c) => `<span class="ch${c === "'" ? " ap" : ""}">${c}</span>`).join("")}</span>`).join(" ");

/* ---------- Split headings / statement ---------- */
document.querySelectorAll(".split").forEach((el) => { el.innerHTML = `<span class="split-line"><span>${el.innerHTML}</span></span>`; });
const st = document.getElementById("statement");
const HL = ["Software", "Engineer", "edge:"];
st.innerHTML = st.textContent.trim().split(/\s+/).map((w) => `<span class="w${HL.includes(w) ? " hl" : ""}">${w}</span>`).join(" ");

/* ---------- Hero visual: code lines + CI pipeline ---------- */
const lines = [...document.querySelectorAll("#code .ln")];
const steps = [...document.querySelectorAll("#steps .st")];
if (RM) steps.forEach((s) => s.classList.add("ok"));
else {
  const pipeline = gsap.timeline({ repeat: -1, repeatDelay: 2.5, delay: 2.4 });
  pipeline.call(() => steps.forEach((s) => s.className = "st"));
  steps.forEach((s) => pipeline.call(() => s.classList.add("run")).to({}, { duration: .9 }).call(() => { s.classList.remove("run"); s.classList.add("ok"); }));
  pipeline.fromTo(".badge", { opacity: 0, y: 10, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .5, ease: "back.out(2)" })
          .to(".badge", { opacity: 0, y: -6, duration: .4 }, "+=2.2");
}

if (!RM) {
  // Intro
  const intro = gsap.timeline({ delay: .2 });
  intro.fromTo("#hero-title .ch", { opacity: 0, filter: "blur(16px)", yPercent: 40 },
      { opacity: 1, filter: "blur(0px)", yPercent: 0, duration: 1.1, ease: "expo.out", stagger: .045, clearProps: "filter" })
    .from(".h-in", { opacity: 0, y: 24, duration: 1, ease: "expo.out", stagger: .08 }, "-=.8")
    .from(".nav", { opacity: 0, y: -20, duration: .8, ease: "expo.out" }, "<")
    .from(lines, { opacity: 0, x: -10, duration: .4, ease: "power2.out", stagger: .09 }, "-=.6");
  gsap.set(".badge", { opacity: 0 });

  // Hero parallax out
  gsap.to(".hero-content", { yPercent: -16, opacity: .25, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // Stack tilt
  if (FINE) {
    const v = document.getElementById("stack");
    gsap.set(v, { transformPerspective: 1100 });
    const rx = gsap.quickTo(v, "rotationX", { duration: .9, ease: "power3" }), ry = gsap.quickTo(v, "rotationY", { duration: .9, ease: "power3" });
    addEventListener("pointermove", (e) => { ry((e.clientX / innerWidth - .5) * 12); rx(-(e.clientY / innerHeight - .5) * 9); });
  }

  // Heading mask reveals
  document.querySelectorAll(".split-line > span").forEach((s) => gsap.from(s, { yPercent: 110, duration: 1.2, ease: "expo.out",
    scrollTrigger: { trigger: s.closest(".split"), start: "top 88%", once: true } }));

  // Generic reveal
  ScrollTrigger.batch(".rv", { start: "top 88%", once: true,
    onEnter: (els) => gsap.from(els, { opacity: 0, y: 40, duration: 1, ease: "expo.out", stagger: .06 }) });

  // Statement words light up while scrolling
  gsap.to("#statement .w", { opacity: 1, stagger: .1, ease: "none", scrollTrigger: { trigger: "#statement", start: "top 80%", end: "bottom 50%", scrub: .6 } });

  // Count up
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = +el.dataset.count, from = +(el.dataset.from || 0), suf = el.dataset.suffix || "", o = { n: from };
    el.textContent = from + suf;
    gsap.to(o, { n: end, duration: end > 100 ? 1.8 : 1.4, ease: "power3.out", onUpdate: () => (el.textContent = Math.round(o.n) + suf),
      scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });

  // Projects: cards reveal in a normal grid so every description and link stays reachable
  ScrollTrigger.batch("#hTrack .proj", { start: "top 90%", once: true,
    onEnter: (els) => gsap.from(els, { opacity: 0, y: 40, duration: 1, ease: "expo.out", stagger: .08 }) });

  // Timeline progress
  gsap.to("#timeline .prog", { scaleY: 1, ease: "none", scrollTrigger: { trigger: "#timeline", start: "top 70%", end: "bottom 60%", scrub: true } });

  // Magnetic buttons
  if (FINE) document.querySelectorAll(".magnetic").forEach((b) => {
    const x = gsap.quickTo(b, "x", { duration: .5, ease: "power3" }), y = gsap.quickTo(b, "y", { duration: .5, ease: "power3" });
    b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .25); y((e.clientY - r.top - r.height / 2) * .35); });
    b.addEventListener("pointerleave", () => { x(0); y(0); });
  });
}

/* ---------- Spotlight cards ---------- */
document.querySelectorAll(".group").forEach((c) => c.addEventListener("pointermove", (e) => {
  const r = c.getBoundingClientRect(); c.style.setProperty("--x", e.clientX - r.left + "px"); c.style.setProperty("--y", e.clientY - r.top + "px");
}));

/* ---------- Active nav ---------- */
const links = [...document.querySelectorAll(".nav-links a")];
links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")); if (!s) return;
  ScrollTrigger.create({ trigger: s, start: "top 40%", end: "bottom 40%",
    onToggle: (self) => self.isActive && links.forEach((x) => x.classList.toggle("active", x === l)) }); });
