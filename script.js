document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    const typewriterElement = document.getElementById("typewriter");
    const texts = ["Software Engineer", "UML Designer", "Java Programmer", "Python Developer"];
    let textIndex = 0, charIndex = 0, isDeleting = false;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light");
        toggleBtn.innerHTML = "🌙"; // Moon icon for light mode
        
        // Apply light theme to other elements
        document.querySelectorAll("header, section, footer").forEach(element => {
            element.classList.add("light");
        });
    } else {
        body.classList.remove("light");
        toggleBtn.innerHTML = "🌞"; // Sun icon for dark mode
    }

    // Toggle Dark/Light Mode
    toggleBtn.addEventListener("click", () => {
        const isLight = body.classList.toggle("light");

        // Save the theme preference in localStorage
        localStorage.setItem("theme", isLight ? "light" : "dark");

        // Update the toggle button icon
        toggleBtn.innerHTML = isLight ? "🌙" : "🌞";
        
        // Apply theme to specific elements
        document.querySelectorAll("header, section, footer").forEach(element => {
            if (isLight) {
                element.classList.add("light");
            } else {
                element.classList.remove("light");
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
        });
    });

    // Typewriter Effect
    function typewriter() {
        const currentText = texts[textIndex];
        typewriterElement.textContent = isDeleting
            ? currentText.slice(0, --charIndex)
            : currentText.slice(0, ++charIndex);

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typewriter, 2000); // Pause at the end of the text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Move to the next text
            setTimeout(typewriter, 500); // Pause before starting the next text
        } else {
            setTimeout(typewriter, isDeleting ? 50 : 100); // Typing/Deleting speed
        }
    }
    typewriter();

    // Make project cards keyboard accessible
    document.querySelectorAll('.project-category').forEach(card => {
        card.addEventListener('keydown', (e) => {
            // If Enter or Space key is pressed
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Get the link URL from the onclick attribute
                const url = card.getAttribute('onclick').match(/'([^']+)'/)[1];
                window.open(url, '_blank');
            }
        });
    });
});