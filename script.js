// === PORTFOLIO INTERACTIVE CORE ENGINE ===
document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Ambient Cyber Cursor Glow Spotlight ---
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    }

    // --- 1. Loading Screen Animation ---
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loading-progress');
    const percentageText = document.querySelector('.loading-percentage');
    let progress = 0;

    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 14) + 6;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 600);
            }, 300);
        }
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (percentageText) percentageText.textContent = `${progress}%`;
    }, 40);

    // --- 2. Interactive Particle Canvas Background ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(0, 230, 118, ';
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                if (mouse.x && mouse.y) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        let force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 3;
                        this.y -= (dy / dist) * force * 3;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.shadowBlur = 8;
                ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            let count = Math.min(Math.floor(window.innerWidth / 14), 90);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.strokeStyle = `rgba(0, 242, 254, ${0.18 - dist / 120 * 0.18})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // --- 3. Dynamic Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const roles = [
            "DevOps Engineer 🚀",
            "Full-Stack Developer 💻",
            "Cloud & IaC Architect ☁️",
            "Software Engineer 🎓",
            "CI/CD Automation Specialist 🛠️"
        ];
        let roleIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            typewriterElement.textContent = isDeleting
                ? currentRole.substring(0, charIndex--)
                : currentRole.substring(0, charIndex++);

            let speed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentRole.length + 1) {
                speed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 400;
            }
            setTimeout(type, speed);
        }
        type();
    }

    // --- 4. Role Filter Lens Switcher (All / DevOps / Full-Stack) ---
    const roleBtns = document.querySelectorAll('.role-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');

    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            roleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedRole = btn.getAttribute('data-role');

            // Filter Skills
            skillCards.forEach(card => {
                const cardRole = card.getAttribute('data-role');
                if (selectedRole === 'all' || cardRole === 'all' || cardRole === selectedRole) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            // Filter Projects
            projectCards.forEach(card => {
                const cardRole = card.getAttribute('data-role');
                if (selectedRole === 'all' || cardRole === 'hybrid' || cardRole === selectedRole) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 5. Skill Category Tabs ---
    const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
    skillTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 6. 3D Card Tilt Effect (Scoped strictly to Skill Cards & Stat Cards, NOT Project Cards) ---
    const tiltElements = document.querySelectorAll('.skill-card, .stat-card');
    tiltElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // --- 7. Interactive Terminal Engine ---
    const termInput = document.getElementById('term-input');
    const termOutput = document.getElementById('term-output');
    const termBody = document.getElementById('term-body');

    if (termInput && termOutput) {
        const commands = {
            help: () => `
                <div class="term-line"><span class="term-info">Available Commands:</span></div>
                <div class="term-line">  <span class="term-warning">whoami</span>       - Summary about Muhammad Hasnain</div>
                <div class="term-line">  <span class="term-warning">skills</span>       - List DevOps & Full-Stack competencies</div>
                <div class="term-line">  <span class="term-warning">projects</span>     - Display top enterprise & cloud projects</div>
                <div class="term-line">  <span class="term-warning">experience</span>   - Display career timeline & education</div>
                <div class="term-line">  <span class="term-warning">blueprint</span>    - Open UML System Architecture Lightbox</div>
                <div class="term-line">  <span class="term-warning">contact</span>      - Get email, phone, and profile links</div>
                <div class="term-line">  <span class="term-warning">matrix</span>       - Trigger cyber code rain sequence</div>
                <div class="term-line">  <span class="term-warning">sudo hire</span>    - Quick recruitment gateway</div>
                <div class="term-line">  <span class="term-warning">clear</span>        - Clear terminal screen</div>
            `,
            whoami: () => `
                <div class="term-line"><span class="term-success">Muhammad Hasnain</span> - Software Engineer, DevOps Engineer & Full-Stack Developer.</div>
                <div class="term-line">Graduating from FAST NUCES (GPA 3.1/4.0). Skilled in AWS, Terraform, Docker, Kubernetes, Jenkins, React.js, and Node.js.</div>
            `,
            skills: () => `
                <div class="term-line"><span class="term-info">[Cloud & DevOps]:</span> AWS, Terraform, Docker, Kubernetes, Jenkins, GitLab CI, GitHub Actions, Prometheus, Grafana, Linux, Bash.</div>
                <div class="term-line"><span class="term-info">[Full-Stack & Languages]:</span> React.js, Next.js, Node.js, Express, TypeScript, Python, C, C++, C#, Java, Haskell, R, MongoDB, MySQL.</div>
            `,
            projects: () => `
                <div class="term-line">1. <span class="term-success">BidOps</span>: <a href="https://bid-acys5chiy-hasnain-rdjs-projects.vercel.app/login" target="_blank" class="term-info">bid-acys5chiy-hasnain-rdjs-projects.vercel.app</a></div>
                <div class="term-line">2. <span class="term-success">THE-MovieBox</span>: <a href="https://the-movie-box-psi.vercel.app/" target="_blank" class="term-info">the-movie-box-psi.vercel.app</a></div>
                <div class="term-line">3. <span class="term-success">A-Net</span>: <a href="https://a-net-fast.vercel.app/login" target="_blank" class="term-info">a-net-fast.vercel.app</a></div>
                <div class="term-line">4. <span class="term-success">Mast Pharmacy</span>: <a href="https://mastpharmacy.netlify.app/login" target="_blank" class="term-info">mastpharmacy.netlify.app</a></div>
            `,
            blueprint: () => {
                openModal();
                return `<div class="term-line"><span class="term-success">Opening System Architecture Lightbox...</span></div>`;
            },
            experience: () => `
                <div class="term-line">▸ <span class="term-warning">Freelance Developer & System Architect</span> | Upwork (100% Job Success Score)</div>
                <div class="term-line">▸ <span class="term-warning">Web Development Intern</span> | Oasis Infobyte</div>
                <div class="term-line">▸ <span class="term-warning">SAP ABAP Intern</span> | PARCO-CHQ</div>
                <div class="term-line">▸ <span class="term-warning">BS Software Engineering</span> | FAST NUCES (08/2022 - 07/2026)</div>
            `,
            contact: () => `
                <div class="term-line">📧 Email: <a href="mailto:mhussnainzardari34@gmail.com" class="term-info">mhussnainzardari34@gmail.com</a></div>
                <div class="term-line">📱 Phone/WhatsApp: <span class="term-success">+92 305 3694346</span></div>
                <div class="term-line">🌐 GitHub: <a href="https://github.com/Hasnain-rdj" target="_blank" class="term-info">github.com/Hasnain-rdj</a></div>
            `,
            "sudo hire": () => `
                <div class="term-line"><span class="term-success">Access Granted! 🚀</span> Send an email to <span class="term-warning">mhussnainzardari34@gmail.com</span> to discuss job opportunities!</div>
            `,
            matrix: () => {
                setTimeout(runMatrixRain, 100);
                return `<div class="term-line"><span class="term-success">Initiating Cyber Matrix Code Rain...</span></div>`;
            }
        };

        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawCmd = termInput.value.trim();
                const cmd = rawCmd.toLowerCase();

                const echoLine = document.createElement('div');
                echoLine.className = 'terminal-line';
                echoLine.innerHTML = `<span class="prompt-prefix">hasnain</span><span class="prompt-host">@devops-node</span>:<span class="prompt-path">~</span><span class="prompt-char">$</span> ${rawCmd}`;
                termOutput.appendChild(echoLine);

                if (cmd === 'clear') {
                    termOutput.innerHTML = '';
                } else if (commands[cmd]) {
                    const resultDiv = document.createElement('div');
                    resultDiv.innerHTML = commands[cmd]();
                    termOutput.appendChild(resultDiv);
                } else if (cmd !== '') {
                    const errDiv = document.createElement('div');
                    errDiv.className = 'terminal-line term-error';
                    errDiv.textContent = `zsh: command not found: ${rawCmd}. Type 'help' for available commands.`;
                    termOutput.appendChild(errDiv);
                }

                termInput.value = '';
                termBody.scrollTop = termBody.scrollHeight;
            }
        });
    }

    // Matrix Rain Effect
    function runMatrixRain() {
        if (!termOutput) return;
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
        let lines = 0;
        const matrixInterval = setInterval(() => {
            let lineStr = '';
            for (let i = 0; i < 40; i++) {
                lineStr += chars.charAt(Math.floor(Math.random() * chars.length)) + ' ';
            }
            const div = document.createElement('div');
            div.className = 'terminal-line term-success';
            div.style.fontFamily = 'monospace';
            div.textContent = lineStr;
            termOutput.appendChild(div);
            termBody.scrollTop = termBody.scrollHeight;
            lines++;
            if (lines > 12) clearInterval(matrixInterval);
        }, 120);
    }

    // --- 8. Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light');
            themeToggleBtn.textContent = '🌙';
        } else {
            themeToggleBtn.textContent = '🌞';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light');
            const isLight = document.body.classList.contains('light');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggleBtn.textContent = isLight ? '🌙' : '🌞';
        });
    }

});

// --- 9. Email Copy Helper ---
function copyEmail() {
    const email = 'mhussnainzardari34@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    });
}

// --- 10. Architecture Lightbox Functions ---
function openModal() {
    const modal = document.getElementById('architecture-modal');
    if (modal) modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('architecture-modal');
    if (modal) modal.classList.remove('active');
}