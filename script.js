document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    const typewriterElement = document.getElementById("typewriter");
    const texts = ["Software Engineer", "UML Designer", "Java Programmer", "Python Developer"];
    let textIndex = 0, charIndex = 0, isDeleting = false;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        toggleBtn.innerHTML = "🌞"; // Sun icon for dark mode
    } else {
        toggleBtn.innerHTML = "🌙"; // Moon icon for light mode
    }

    // Toggle Dark/Light Mode
    toggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const isDark = body.classList.contains("dark-mode");

        // Save the theme preference in localStorage
        localStorage.setItem("theme", isDark ? "dark" : "light");

        // Update the toggle button icon
        toggleBtn.innerHTML = isDark ? "🌞" : "🌙";
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
});