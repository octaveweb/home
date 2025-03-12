function showLoader(texts, callback) {
    if (!texts || !Array.isArray(texts) || texts.length === 0) {
        console.error("❌ Error: Please provide a valid array of texts.");
        return;
    }

    // If loader already exists, remove it first
    if (document.getElementById("loader")) {
        document.getElementById("loader").remove();
    }

    // Create loader HTML
    const loaderHTML = `
        <div class="loader" id="loader">
            <p id="loading-text"></p>
        </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", loaderHTML);

    const loadingText = document.getElementById("loading-text");
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[index];

        if (!isDeleting) {
            loadingText.textContent = currentText.substring(0, charIndex++);
        } else {
            loadingText.textContent = currentText.substring(0, charIndex--);
        }

        if (!isDeleting && charIndex === currentText.length + 1) {
            setTimeout(() => isDeleting = true, 500);
        } else if (isDeleting && charIndex === 0) {
            if (index === texts.length - 1) {
                setTimeout(() => removeLoader(callback), 300);
                return;
            }
            isDeleting = false;
            index++;
        }

        setTimeout(typeEffect, isDeleting ? 30 : 70);
    }

    function removeLoader(callback) {
        gsap.to("#loading-text", {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                gsap.to(".loader", {
                    height: 0,
                    borderBottomLeftRadius: "50%",
                    borderBottomRightRadius: "50%",
                    duration: 1.2,
                    ease: "power3.inOut",
                    onComplete: () => {
                        document.getElementById("loader").remove();
                        if (callback) callback();
                    }
                });
            }
        });
    }

    typeEffect();
}
