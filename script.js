/* ==========================================================================
   MADDURI VARA PRASAD - JAVA FULL STACK DEVELOPER PORTFOLIO SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. Preloader Fade-out
    // ==========================================================================
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.classList.add("fade-out");
            }, 600);
        });

        // Fallback safety timeout if load event fired earlier
        setTimeout(() => {
            if (!preloader.classList.contains("fade-out")) {
                preloader.classList.add("fade-out");
            }
        }, 2000);
    }

    // ==========================================================================
    // 2. Dynamic Multi-Role Typing Animation
    // ==========================================================================
    const typingElement = document.getElementById("typing");
    if (typingElement) {
        const roles = [
            "Java Full Stack Developer",
            "Backend Engineer",
            "Frontend Web Developer",
            "Problem Solver (DSA)"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const delayBetweenRoles = 2000;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentRole.length) {
                currentSpeed = delayBetweenRoles;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                currentSpeed = 500;
            }

            setTimeout(typeEffect, currentSpeed);
        }

        typeEffect();
    }

    // ==========================================================================
    // 3. Sticky Navbar & Shadow on Scroll
    // ==========================================================================
    const navbar = id("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar?.classList.add("scrolled");
        } else {
            navbar?.classList.remove("scrolled");
        }
    });

    // ==========================================================================
    // 4. Mobile Menu Toggle & Auto-Close
    // ==========================================================================
    const menuToggle = id("menu-toggle");
    const navLinks = id("nav-links");
    const navItems = document.querySelectorAll(".nav-item");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        // Close menu when link is clicked
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    const icon = menuToggle.querySelector("i");
                    if (icon) {
                        icon.classList.remove("fa-xmark");
                        icon.classList.add("fa-bars");
                    }
                }
            });
        });
    }

    // ==========================================================================
    // 5. Active Section Highlighting on Scroll (Intersection Observer)
    // ==========================================================================
    const sections = document.querySelectorAll("section[id]");

    function highlightNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(link => link.classList.remove("active"));
                navLink?.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", highlightNav);

    // ==========================================================================
    // 6. Scroll Reveal Animations (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 7. Interactive Project Details Modal
    // ==========================================================================
    const projectDetailsData = {
        hospital: {
            title: "Hospital Patient Portal",
            subtitle: "Full Stack Java Backend & Database Application",
            icon: "fa-hospital",
            description: "A comprehensive healthcare administration application developed using Core Java, Servlets, JSP, JDBC, and MySQL. Enables patient registration, doctor appointment booking, medical record lookup, and secure relational database persistence.",
            features: [
                "User Patient Registration & Authenticated Profile Access",
                "Doctor Appointment Booking & Dynamic Status Tracking",
                "JDBC Database Connectivity with Relational MySQL Persistence",
                "Structured Apache Tomcat Deployment with Servlet Lifecycle"
            ],
            tech: ["Java", "JSP", "Servlets", "JDBC", "MySQL", "HTML", "CSS", "JavaScript"],
            github: "https://github.com/VaraPrasad-225/HospitalPatientPortal",
            live: "https://github.com/VaraPrasad-225/HospitalPatientPortal"
        },
        cineflix: {
            title: "CineFlix+ OTT Platform",
            subtitle: "Streaming Entertainment Web Interface",
            icon: "fa-film",
            description: "An educational OTT video streaming web platform interface built for frontend portfolio demonstration. Features hero video banners, movie category carousels, detailed media modals, and responsive dark glass UI.",
            features: [
                "Dynamic Movie & Series Catalog Carousels",
                "Interactive Trailer Preview Modal with Audio Controls",
                "Responsive Dark Theme UI with Glassmorphism",
                "Educational UI/UX Architecture Showcase"
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "Educational Project"],
            github: "https://github.com/VaraPrasad-225/NetflixUiClone",
            live: "https://github.com/VaraPrasad-225/NetflixUiClone"
        },
        connectpro: {
            title: "ConnectPro – Professional Networking",
            subtitle: "Social Networking Platform Interface",
            icon: "fa-linkedin",
            description: "An educational professional networking web platform interface built for portfolio demonstration. Features user feed posts, profile sidebars, connection interactions, and dynamic layout responsiveness.",
            features: [
                "Interactive Post Creation & Reaction Buttons",
                "Profile Connections Sidebar & Messaging Panel",
                "Sticky Header Navigation & Search Bar",
                "Educational UI/UX Layout Architecture"
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "Educational Project"],
            github: "https://github.com/VaraPrasad-225/LinkedinUiClone",
            live: "https://github.com/VaraPrasad-225/LinkedinUiClone"
        },
        soundsphere: {
            title: "SoundSphere – Music Streaming",
            subtitle: "Audio Web App Interface",
            icon: "fa-spotify",
            description: "An interactive educational music player application with audio playback controls, playlist selection, volume slider, track seek bar, and album cover interface.",
            features: [
                "Custom Audio Player with Play, Pause, Next, Previous & Seek",
                "Interactive Track Queue & Album Art Display",
                "Dynamic Volume Control & Duration Timers",
                "Educational Audio Player Interface"
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "Educational Project"],
            github: "https://github.com/VaraPrasad-225/soptifyUICLONE",
            live: "https://github.com/VaraPrasad-225/soptifyUICLONE"
        },
        portfolio: {
            title: "Personal Developer Portfolio",
            subtitle: "Recruiter-Ready Glassmorphism Showcase",
            icon: "fa-user-gear",
            description: "A modern, high-performance portfolio website showcasing projects, skills, education, DSA statistics, and interactive modals built with custom CSS design tokens and vanilla JavaScript.",
            features: [
                "Custom Glassmorphic Aesthetics & Dynamic Glowing Accents",
                "Multi-Role Typing Effect & Interactive Details Modals",
                "Project Filtering & Responsive Mobile Menu",
                "SEO Optimized & Accessible Layout"
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "Glassmorphism"],
            github: "https://github.com/VaraPrasad-225/varaportfolio",
            live: "https://github.com/VaraPrasad-225/varaportfolio"
        },
        ecommerce: {
            title: "E-Commerce Website",
            subtitle: "Responsive Online Shopping Storefront",
            icon: "fa-shopping-cart",
            description: "A feature-rich shopping web interface allowing customers to search products, filter items by category, manage cart state, and view order summaries.",
            features: [
                "Product Catalog Filter & Category Navigation",
                "Shopping Cart State Management & Price Totals",
                "Browser LocalStorage Persistence for Shopping Cart Items",
                "Clean Glassmorphic Card Layout"
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
            github: "https://github.com/VaraPrasad-225/ecommerce-website",
            live: "https://github.com/VaraPrasad-225/ecommerce-website"
        },
        product: {
            title: "Product Landing Page",
            subtitle: "Creative Showcase Landing Page",
            icon: "fa-box-open",
            description: "A modern, creative product showcase landing page built with responsive design, smooth feature grids, call-to-action sections, and dynamic UI elements.",
            features: [
                "Interactive Product Showcase Sections",
                "Responsive Layout Tailored for Mobile, Tablet, and Desktop",
                "CSS Animations & Micro-interactions"
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "Flexbox / Grid"],
            github: "https://github.com/VaraPrasad-225/Product-Landing-Page",
            live: "https://github.com/VaraPrasad-225/Product-Landing-Page"
        },
        tap: {
            title: "TAP Academy Clone",
            subtitle: "Learning Platform Interface Replica",
            icon: "fa-laptop-code",
            description: "A responsive frontend clone of the TAP Academy official learning portal homepage, course landing pages, and navigation framework.",
            features: [
                "Replicated Hero Banners and Course Selection Grids",
                "CSS Flexbox & Grid CSS Layout Architecture",
                "Cross-browser Responsive Touch Compatibility"
            ],
            tech: ["HTML5", "CSS3", "JavaScript"],
            github: "https://github.com/VaraPrasad-225/Tap-Academy-Clone",
            live: "https://github.com/VaraPrasad-225/Tap-Academy-Clone"
        },
        fest: {
            title: "College Fest Landing Page",
            subtitle: "Event Registration & Showcase Page",
            icon: "fa-calendar-alt",
            description: "An event landing website built for college technical and cultural fests with event schedules, registration input validation, and dynamic visual banners.",
            features: [
                "Event Schedule Timeline & Program Grid",
                "Interactive Student Registration Form with Validation",
                "Smooth Visual Animations and DOM Interactions"
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "Animations"],
            github: "https://github.com/VaraPrasad-225/College-Fest-Landing-Page",
            live: "https://github.com/VaraPrasad-225/College-Fest-Landing-Page"
        },
        instagram: {
            title: "Instagram UI Clone",
            subtitle: "Social Media Web App Replica",
            icon: "fa-instagram",
            description: "An educational web application clone of Instagram featuring story carousels, main feed cards, collapsible left sidebar navigation, and interactive like/comment controls.",
            features: [
                "Story Carousel & Responsive Feed Card Layout",
                "Interactive Post Actions (Like, Comment, Save)",
                "Left Sidebar Navigation with Collapsible Desktop Layout",
                "Educational UI/UX Aesthetic"
            ],
            tech: ["HTML5", "CSS3", "JavaScript"],
            github: "https://github.com/VaraPrasad-225/InstagramUIClone",
            live: "https://github.com/VaraPrasad-225/InstagramUIClone"
        }
    };

    // ==========================================================================
    // 7.1 Category Filter Buttons Logic
    // ==========================================================================
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filterValue = btn.getAttribute("data-filter");

                projectCards.forEach(card => {
                    const category = card.getAttribute("data-category");
                    const isFeatured = card.classList.contains("featured-card");

                    if (filterValue === "all") {
                        card.style.display = "flex";
                    } else if (filterValue === "featured") {
                        card.style.display = isFeatured ? "flex" : "none";
                    } else if (filterValue === "fullstack") {
                        card.style.display = (category === "fullstack") ? "flex" : "none";
                    } else if (filterValue === "frontend") {
                        card.style.display = (category === "frontend") ? "flex" : "none";
                    }
                });
            });
        });
    }

    const modal = id("project-modal");
    const modalClose = id("modal-close");
    const modalBody = id("modal-body");
    const openDetailsBtns = document.querySelectorAll(".open-details-btn");

    function sanitizeHTML(str) {
        if (typeof str !== "string") return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function openProjectModal(projectKey) {
        const data = projectDetailsData[projectKey];
        if (!data || !modalBody || !modal) return;

        const iconClass = sanitizeHTML(data.icon || "fa-laptop-code");
        const titleText = sanitizeHTML(data.title);
        const subtitleText = sanitizeHTML(data.subtitle);
        const descText = sanitizeHTML(data.description);
        const githubUrl = encodeURI(data.github || "#");
        const liveUrl = data.live ? encodeURI(data.live) : null;

        const techBadges = (data.tech || []).map(t => `<span>${sanitizeHTML(t)}</span>`).join("");
        const featureItems = (data.features || []).map(f => `<li>${sanitizeHTML(f)}</li>`).join("");
        const liveBtn = liveUrl 
            ? `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="project-btn live-demo-btn"><i class="fas fa-external-link-alt"></i> Open Live Demo</a>`
            : `<span class="project-btn disabled-btn" title="Backend application"><i class="fas fa-clock"></i> Live Demo (Coming Soon)</span>`;

        modalBody.innerHTML = `
            <div class="modal-header-icon"><i class="fas ${iconClass}"></i></div>
            <h3 class="modal-title">${titleText}</h3>
            <p class="modal-subtitle">${subtitleText}</p>
            <p class="modal-description">${descText}</p>
            
            <h4 class="modal-section-title">Key Features & Architecture:</h4>
            <ul class="modal-features">${featureItems}</ul>

            <h4 class="modal-section-title">Technologies Used:</h4>
            <div class="modal-tech-list project-tech">${techBadges}</div>

            <div class="modal-actions">
                <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="project-btn"><i class="fab fa-github"></i> View GitHub Repository</a>
                ${liveBtn}
            </div>
        `;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
    }

    openDetailsBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const projectKey = btn.getAttribute("data-project");
            if (projectKey) openProjectModal(projectKey);
        });
    });

    modalClose?.addEventListener("click", closeProjectModal);

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) closeProjectModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal?.classList.contains("active")) {
            closeProjectModal();
        }
    });

    // ==========================================================================
    // 8. Back To Top Button
    // ==========================================================================
    const backToTopBtn = id("backToTop");

    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================================================================
    // 9. Contact Form Handling
    // ==========================================================================
    const contactForm = id("contact-form");
    const formStatus = id("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = id("name").value.trim();
            const email = id("email").value.trim();
            const message = id("message").value.trim();

            if (name && email && message) {
                if (formStatus) {
                    formStatus.textContent = `Thank you ${name}! Your message has been sent successfully.`;
                    formStatus.className = "form-status success";
                }
                contactForm.reset();

                setTimeout(() => {
                    if (formStatus) formStatus.style.display = "none";
                }, 5000);
            } else {
                if (formStatus) {
                    formStatus.textContent = "Please fill in all required fields.";
                    formStatus.className = "form-status error";
                }
            }
        });
    }

    // Utility Helper Function
    function id(elementId) {
        return document.getElementById(elementId);
    }
});