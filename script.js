// Initialize Lenis
const lenis = new Lenis({ autoRaf: true });
lenis.on("scroll", console.log);

// Initialize GSAP
gsap.registerPlugin(TextPlugin);

const typingText = document.getElementById("typingText");
const texts = ["CTIVE AI", "CTIVE WEB"];
let index = 0;

function typeAndDelete() {
  gsap.to(typingText, {
    duration: 4,
    text: texts[index],
    ease: "power2.inOut",
    onComplete: () => {
      setTimeout(() => {
        gsap.to(typingText, {
          duration: 2,
          text: "",
          ease: "power2.inOut",
          onComplete: () => {
            index = (index + 1) % texts.length;
            setTimeout(typeAndDelete, 500);
          },
        });
      }, 2000);
    },
  });
}
typeAndDelete();

// Dark to Light Theme Switch
const moonSun = document.getElementById("moonSun");
const moonImg = moonSun.querySelector(".moon");
const sunImg = moonSun.querySelector(".sun");
const body = document.body;

function toggleTheme() {
  const isDarkMode = body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  moonImg.classList.toggle("hidden", isDarkMode);
  sunImg.classList.toggle("hidden", !isDarkMode);

  animateSpans();
  animateSvg();
}

document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = localStorage.getItem("theme") === "dark";
  body.classList.toggle("dark-mode", isDarkMode);
  moonImg.classList.toggle("hidden", isDarkMode);
  sunImg.classList.toggle("hidden", !isDarkMode);
  animateSpans();
  animateSvg();
});

moonSun.addEventListener("click", toggleTheme);

function slide() {
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active");
      const newIndex = (currentIndex + index) % slides.length;
      
      let position;
      if (newIndex === 0) {
        position = "-115%"; // Left-most slide
      } else if (newIndex === 2) {
        position = "115%"; // Right-most slide
      } else {
        position = "0"; // Center slide
      }

      slide.style.transform = `translateX(${position}) scale(${newIndex === 1 ? 1.7 : 0.5})`;
      slide.style.opacity = newIndex === 1 ? 1 : 0.5;
    });

    slides[1].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  updateSlides();
  setInterval(nextSlide, 4500);
}

slide();




// Menu Toggle & Animation
const menuBtn = document.getElementById("menuBtn");
const menuBox = document.getElementById("menu-box");
const menuIcon = menuBtn.querySelector("i");

function toggleMenu() {
  const isOpen = menuBox.style.transform === "translateX(0%)";
  menuBox.style.transform = isOpen ? "translateX(100%)" : "translateX(0%)";
  document.body.style.overflow = isOpen ? "scroll" : "hidden";
  menuBox.style.borderRadius = isOpen ? "50%" : "0";
  menuIcon.classList.toggle("fa-xmark", !isOpen);
  menuIcon.classList.toggle("fa-bars", isOpen);

  gsap.to("#menu-box ul li", {
    x: isOpen ? 100 : 0,
    opacity: isOpen ? 0 : 1,
    duration: 0.5,
    stagger: 0.2,
  });
}
menuBtn.addEventListener("click", toggleMenu);

// Scroll Progress Bar
const progressBar = document.querySelector(".progress-bar");
window.addEventListener("scroll", () => {
  let scrolled =
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
    100;
  progressBar.style.width = scrolled + "%";
  menuBtn.style.transform = scrolled > 10 || menuBox.style.transform === "translateX(0%)" ? "scale(1)" : "scale(0)";
  menuBtn.style.opacity = scrolled > 10 || menuBox.style.transform === "translateX(0%)" ? "100%" : "0%";
});
