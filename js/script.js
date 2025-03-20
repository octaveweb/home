// Privinting right click and keybord shortcut
// function preventTofightClick(){
//   document.addEventListener("contextmenu", (e) => e.preventDefault()); // Disable right-click
    
// document.addEventListener("keydown", (e) => {
//     if (
//         e.ctrlKey && (e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S" || e.key === "p" || e.key === "P") || // Ctrl+U, Ctrl+S, Ctrl+P
//         e.ctrlKey && e.shiftKey && (e.key === "i" || e.key === "I" || e.key === "j" || e.key === "J") || // Ctrl+Shift+I, Ctrl+Shift+J
//         e.key === "F12" // F12
//     ) {
//         e.preventDefault();
//     }
// });
// }
// preventTofightClick();

function customCursor() {
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("cursor-grow")) {
      cursor.classList.add("grow");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("cursor-grow")) {
      cursor.classList.remove("grow");
    }
  });

  document.addEventListener("mousedown", () => {
    cursor.classList.add("click");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("click");
  });
}

customCursor();


// Initialize Lenis
const lenis = new Lenis({ autoRaf: true });
lenis.on("scroll", console.log);

// Initialize GSAP
gsap.registerPlugin(TextPlugin);

const typingText = document.getElementById("typingText");
const texts = [ "CTIVE WEB","PORTFOLIO.."];
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



document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menuBox = document.getElementById("menu-box");
  const progressBar = document.querySelector(".progress-bar");

  if (menuBtn && menuBox) {
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
  }


});




function workSection() {

// Work Section
const workList = document.querySelector(".letes-work ul");
const workItems = document.querySelectorAll(".letes-work ul li");
const workImage = document.querySelector(".work-image");
const workImageContainer = document.querySelector(".work-image .image-container");
let workImageWidth = workImage.offsetWidth;
let workImageHeight = workImage.offsetHeight;

window.addEventListener("resize", () => {
    workImageWidth = workImage.offsetWidth;
    workImageHeight = workImage.offsetHeight;
});

document.addEventListener("mousemove", (e) => {
  const { clientX: x, clientY: y } = e;
  
  if (workList.matches(":hover")) {
      const offsetX = x - workImage.offsetWidth / 2;
      const offsetY = y - workImage.offsetHeight / 2;
      workImage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1)`;
  }
});

workItems.forEach((item, index) => {
    item.addEventListener("mouseenter", (event) => {
        workImage.classList.add("active");
        workImage.style.opacity = "1";

        // Move to the hovered image smoothly
        const targetPosition = index * workImageHeight;
        workImageContainer.style.transform = `translateY(-${targetPosition}px)`;
    });

    item.addEventListener("mouseleave", () => {
        workImage.classList.remove("active");
    });

    // Click event to open a link (example array)
    item.addEventListener("click", () => {
        const links = [
            "https://example.com/link1",
            "https://example.com/link2",
            "https://example.com/link3",
            "https://example.com/link4"
        ];
        window.open(links[index], "_blank");
    });
});

workList.addEventListener("mouseleave", () => {
    workImage.style.transform = "scale(0)";
    workImage.style.opacity = "0";
    workImage.classList.remove("active");
});
}

  workSection();


  gsap.to(".cir-l", {
    scale: 1.1,
    boxShadow: "0px 0px 20px 40px var(--theme), 0px 0px 60px 80px var(--white), 0px 0px 100px 160px var(--theme)",
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "power1.inOut"
});

// Mouse Move Effect
document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    gsap.to(".cir-l", {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power2.out"
    });
});
