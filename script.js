import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Scroll Animation UI
gsap.defaults({
  ease: "none",
  duration: 2,
});

const tl = gsap.timeline();

tl.to(".user-interface-img-container3", {
  yPercent: -300,
}).to(".user-interface-img-container2", {
  yPercent: -300,
});

ScrollTrigger.create({
  animation: tl,
  trigger: "#body-projects-ui",
  start: "top top",
  end: "+=4000",
  markers: false,
  scrub: true,
  pin: true,
  anticipatePin: 1,
});

// Scroll Animation Frontend

const tlFrontend = gsap.timeline();

tlFrontend
  .to(".frontend-img-container3", {
    yPercent: -300,
  })
  .to(".frontend-img-container2", {
    yPercent: -300,
  });

ScrollTrigger.create({
  animation: tlFrontend,
  trigger: "#body-projects-frontend",
  start: "top top",
  end: "+=4000",
  markers: false,
  scrub: true,
  pin: true,
  anticipatePin: 1,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Back up
// using gsap scroll to plugin
document.querySelectorAll("#arrow_container").forEach((btn) => {
  btn.addEventListener("click", () => {
    gsap.to(window, {
      duration: 5,
      ease: "circ",
      scrollTo: { y: "#hero", autoKill: true },
    });
  });
});

// up fade animation on scroll
const boxes = gsap.utils.toArray("#arrow_container");

boxes.forEach((box, i) => {
  const anim = gsap.fromTo(
    box,
    { autoAlpha: 0, y: 0 },
    { duration: 1, autoAlpha: 1, y: 0 }
  );
  ScrollTrigger.create({
    trigger: ".trigger-up",
    start: "bottom bottom",
    animation: anim,
    toggleActions: "restart none none reverse",
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hero Arrow to Next Section
// using gsap scroll to plugin
document.querySelectorAll(".down-arrow").forEach((btn) => {
  btn.addEventListener("click", () => {
    gsap.to(window, {
      duration: 3,
      ease: "circ",
      scrollTo: { y: "#body-projects-ui", autoKill: true },
    });
  });
});

// fade arrow
const arrowTag = document.querySelector(".down-arrow");

const easing = function (x) {
  return x * x * x;
};

const fadeArrow = function () {
  const pixels = window.pageYOffset;

  arrowTag.style.opacity = 1 - easing(pixels / 500);
};

window.addEventListener("scroll", function () {
  fadeArrow();
});
