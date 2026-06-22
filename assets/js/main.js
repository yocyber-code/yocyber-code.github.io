/* ===== MOBILE NAV ===== */
const navMenu = document.getElementById("nav-menu");
document.getElementById("nav-toggle").addEventListener("click", () => navMenu.classList.add("show-menu"));
document.getElementById("nav-close").addEventListener("click", () => navMenu.classList.remove("show-menu"));
document.querySelectorAll(".nav__link").forEach((l) =>
  l.addEventListener("click", () => navMenu.classList.remove("show-menu"))
);

/* ===== THEME (default dark; persisted) ===== */
const themeBtn = document.getElementById("theme-button");
const themeIcon = themeBtn.querySelector("i");
const applyTheme = (light) => {
  document.body.classList.toggle("light-theme", light);
  themeIcon.className = light ? "ri-sun-line" : "ri-moon-line";
};
applyTheme(localStorage.getItem("theme") === "light");
themeBtn.addEventListener("click", () => {
  const light = !document.body.classList.contains("light-theme");
  applyTheme(light);
  localStorage.setItem("theme", light ? "light" : "dark");
});

/* ===== SCROLL REVEAL ===== */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ===== HEADER BG + SCROLLUP + ACTIVE LINK ===== */
const header = document.getElementById("header");
const scrollUp = document.getElementById("scroll-up");
const sections = document.querySelectorAll("section[id]");

const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle("bg-header", y >= 50);
  scrollUp.classList.toggle("show-scroll", y >= 350);

  sections.forEach((sec) => {
    const top = sec.offsetTop - 90;
    const link = document.querySelector(`.nav__link[href="#${sec.id}"]`);
    if (link) link.classList.toggle("active-link", y >= top && y < top + sec.offsetHeight);
  });
};
window.addEventListener("scroll", onScroll);
onScroll();
