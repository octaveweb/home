
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


// menu-box icon change
{
  let menuBtn = document.getElementById("menuBtn");
  let menuBox = document.getElementById("menu-box");

  // Function to toggle the icon class inside #menu
  function changeIconClass() {
    let icon = menuBtn.querySelector("i");

    if (icon.classList.contains("fa-xmark")) {
      icon.classList.remove("fa-sharp", "fa-solid", "fa-xmark");
      icon.classList.add("fa-sharp-duotone", "fa-regular", "fa-bars");
    } else {
      icon.classList.remove("fa-sharp-duotone", "fa-regular", "fa-bars");
      icon.classList.add("fa-sharp", "fa-solid", "fa-xmark");
    }
  }

  menuBtn.addEventListener("click", function () {
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

  const progressBar = document.querySelector(".progress-bar");
  
  window.addEventListener("scroll", () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrolled = (scrollTop / scrollHeight) * 100;
  
      progressBar.style.width = scrolled + "%";
  
      const menuTransform = window.getComputedStyle(menuBox).transform;
  
      // If menuBox is open (translateX(0%)), always keep menuBtn visible
      if (menuTransform === "matrix(1, 0, 0, 1, 0, 0)") {
          menuBtn.style.transform = "scale(1)";
          menuBtn.style.opacity = "100%";
          return;
      }
  
      // If menuBox is closed (translateX(100%)), only show menuBtn if scrolled > 10%
      if (scrolled > 10) {
          menuBtn.style.transform = "scale(1)";
          menuBtn.style.opacity = "100%";
      } else {
          menuBtn.style.transform = "scale(0)";
          menuBtn.style.opacity = "0%";
      }
  });
  
  
}


// page 2 animation
{

}
