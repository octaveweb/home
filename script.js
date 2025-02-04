{
  // Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});
}

// DarkToLight Switch
{
  const moonSun = document.getElementById("moonSun");
  const moonImg = moonSun.querySelector(".moon");
  const sunImg = moonSun.querySelector(".sun");
  const body = document.body;

  // Function to toggle the theme
  function toggleTheme() {
    const isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light"); // Save theme to localStorage
    updateSpanColors(); // Update span colors immediately

    // Toggle visibility of moon and sun icons
    if (isDarkMode) {
      moonImg.classList.add("hidden");
      sunImg.classList.remove("hidden");
    } else {
      sunImg.classList.add("hidden");
      moonImg.classList.remove("hidden");
    }

    // Restart span and SVG animations on theme switch
    animateSpans();
    animateSvg();
  }

  // Apply saved theme on page load
  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const isDarkMode = savedTheme === "dark";

    if (isDarkMode) {
      body.classList.add("dark-mode");
      moonImg.classList.add("hidden");
      sunImg.classList.remove("hidden");
    } else {
      body.classList.remove("dark-mode");
      sunImg.classList.add("hidden");
      moonImg.classList.remove("hidden");
    }

    updateSpanColors(); // Update span colors based on the theme
    animateSpans(); // Run span animation on initial load
    animateSvg(); // Run SVG animation on initial load
  });

  // Attach click event to toggle the theme
  moonSun.addEventListener("click", toggleTheme);
}

// Split text into spans
{
  [...document.querySelectorAll(".break")].forEach((element) => {
    element.innerHTML = element.textContent
      .split("")
      .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
      .join("");
  });

  // Function to update the color of spans based on the theme
  function updateSpanColors() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    const color = isDarkMode ? "#fff" : "#000";

    // Update the color of all span elements
    document.querySelectorAll(".break span").forEach((span) => {
      span.style.color = color;
    });
  }
}

// landing page animation
{
  // GSAP animation for spans
  function animateSpans() {
    const tlSpans = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.2 },
    });

    tlSpans
      .from(".break span", {
        opacity: 0,
        y: () => Math.random() * 50 - 25, // Random vertical movement
        x: () => Math.random() * 40 - 20, // Random horizontal movement
        scale: 0.85, // Initial scaling effect
        rotation: () => Math.random() * 20 - 10, // Small rotation
        stagger: {
          each: 0.1,
          from: "random",
        },
      })
      .to(
        ".break span",
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          x: 0,
          y: 0,
          duration: 1,
          stagger: {
            each: 0.08,
            from: "start",
          },
        },
        "+=0.2"
      );
  }

  // GSAP animation for SVG
  function animateSvg() {
    const tlSvg = gsap.timeline({ defaults: { ease: "elastic.out(1, 0.75)" } });
    tlSvg.fromTo(
      ".svg",
      {
        scale: 0.5,
        rotation: -360,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
      }
    );
  }
}

// menu icon
{
  // Ensure GSAP and ScrollTrigger are loaded
  gsap.registerPlugin(ScrollTrigger);

  gsap.set("#menu", {
    scale: 0.02,
    opacity: 0,
    transformOrigin: "center center",
  });

  gsap.to("#menu", {
    scale: 1,
    opacity: 1,
    duration: 0.7,
    scrollTrigger: {
      trigger: "#menu",
      scroller: "body",
      start: "80% 10%",
      end: "80% 10%",
      markers: false,
      scrub: true,
    },
  });
}

// menu-box icon change
{
  {
    let menu = document.getElementById("menu");
    let menuBox = document.getElementById("menu-box");

    // Function to toggle the icon class inside #menu
    function changeIconClass() {
      let icon = menu.querySelector("i");

      if (icon.classList.contains("fa-xmark")) {
        icon.classList.remove("fa-sharp", "fa-solid", "fa-xmark");
        icon.classList.add("fa-sharp-duotone", "fa-regular", "fa-bars");
      } else {
        icon.classList.remove("fa-sharp-duotone", "fa-regular", "fa-bars");
        icon.classList.add("fa-sharp", "fa-solid", "fa-xmark");
      }
    }

    menu.addEventListener("click", function () {
      changeIconClass();

      const currentTransform = window.getComputedStyle(menuBox).transform;

      if (currentTransform === "matrix(1, 0, 0, 1, 0, 0)") {
        menuBox.style.transform = "translateX(100%)";
        document.body.style.overflow = "scroll";
        menuBox.style.borderTopLeftRadius = "50%";
        menuBox.style.borderBottomLeftRadius = "50%";

        gsap.to("#menu-box ul li", {
          x: 100,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
        });
      } else {
        menuBox.style.transform = "translateX(0)";
        menuBox.style.borderTopLeftRadius = "0";
        menuBox.style.borderBottomLeftRadius = "0";

        document.body.style.overflow = "hidden";

        gsap.set("#menu-box ul li", {
          x: 100,
          opacity: 0,
        });

        gsap.to("#menu-box ul li", {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
        });
      }
    });
  }
}

// page 2 animation
{
 
}
