// Privinting right click and keybord shortcut
function preventTofightClick(){
  document.addEventListener("contextmenu", (e) => e.preventDefault()); // Disable right-click
    
document.addEventListener("keydown", (e) => {
    if (
        e.ctrlKey && (e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S" || e.key === "p" || e.key === "P") || // Ctrl+U, Ctrl+S, Ctrl+P
        e.ctrlKey && e.shiftKey && (e.key === "i" || e.key === "I" || e.key === "j" || e.key === "J") || // Ctrl+Shift+I, Ctrl+Shift+J
        e.key === "F12" // F12
    ) {
        e.preventDefault();
    }
});
}
preventTofightClick();
// Initialize Lenis
const lenis = new Lenis({ autoRaf: true });
lenis.on("scroll", console.log);

// Initialize GSAP
gsap.registerPlugin(TextPlugin);

const typingText = document.getElementById("typingText");
const texts = [ "CTIVE WEB","CTIVE AI"];
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


// <!-- Magnetic Button Script -->
function magneticButton(){
  document.querySelectorAll("[data-magnetic-button]").forEach(button => {
  const text = button.querySelector(".button-text");

  button.addEventListener("mouseenter", (e) => {
      const rect = button.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(button, { x: x * 6, y: y * 6, duration: 0.15, ease: "power2.out" });
      if (text) gsap.to(text, { x: x * 9, y: y * 9, duration: 0.15, ease: "power2.out" });
  });

  button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(button, { x: x * 6, y: y * 6, duration: 0.3, ease: "power3.out" });
      if (text) gsap.to(text, { x: x * 9, y: y * 9, duration: 0.3, ease: "power3.out" });
  });

  button.addEventListener("mouseleave", () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
      if (text) gsap.to(text, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
  });
});
}
magneticButton();

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
