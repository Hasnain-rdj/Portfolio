// === LOADING ANIMATION ===
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loading-progress');
    const percentageText = document.querySelector('.loading-percentage');
    
    let progress = 0;
    const loadingDuration = 6000; // 6 seconds
    const updateInterval = 50; // Update every 50ms
    const totalSteps = loadingDuration / updateInterval;
    const progressStep = 100 / totalSteps;
    
    // Animate loading progress
    const progressInterval = setInterval(() => {
        progress += progressStep;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Fade out loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800);
            }, 500);
        }
        
        progressBar.style.width = progress + '%';
        percentageText.textContent = Math.round(progress) + '%';
    }, updateInterval);
});

// === MAIN PORTFOLIO FUNCTIONALITY ===
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    const typewriterElement = document.getElementById("typewriter");
    const texts = ["Software Engineer", "UML Designer", "Java Programmer", "Python Developer", "Problem Solver", "Tech Innovator"];
    let textIndex = 0, charIndex = 0, isDeleting = false;

    // === Enhanced Theme System ===
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light");
        toggleBtn.innerHTML = "🌙";
        document.querySelectorAll("header, section, footer").forEach(element => {
            element.classList.add("light");
        });
    } else {
        body.classList.remove("light");
        toggleBtn.innerHTML = "🌞";
    }

    // Enhanced Theme Toggle with Simple Animation
    toggleBtn.addEventListener("click", () => {
        const isLight = body.classList.toggle("light");
        localStorage.setItem("theme", isLight ? "light" : "dark");
        toggleBtn.innerHTML = isLight ? "🌙" : "🌞";
        
        document.querySelectorAll("header, section, footer").forEach(element => {
            if (isLight) {
                element.classList.add("light");
            } else {
                element.classList.remove("light");
            }
        });
    });

    // === Simplified Typewriter Effect ===
    function typewriter() {
        const currentText = texts[textIndex];
        
        typewriterElement.textContent = isDeleting
            ? currentText.slice(0, --charIndex)
            : currentText.slice(0, ++charIndex);

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typewriter, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typewriter, 500);
        } else {
            setTimeout(typewriter, isDeleting ? 80 : 120);
        }
    }
    typewriter();

    // === Simple Smooth Scrolling ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            target.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // === Simple Mouse Effects ===
    function initSimpleEffects() {
        const cards = document.querySelectorAll('.skill, .project-category');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // === Enhanced Project Cards ===
    function enhanceProjectCards() {
        document.querySelectorAll('.project-category').forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const url = card.getAttribute('onclick').match(/'([^']+)'/)[1];
                    window.open(url, '_blank');
                }
            });
        });
    }

    // === Initialize Simple Effects ===
    setTimeout(() => {
        initSimpleEffects();
        enhanceProjectCards();
    }, 100);
});