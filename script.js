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
            title: "1. Hospital Patient Portal",
            subtitle: "Full Stack Java Backend & Database Application",
            icon: "fa-hospital",
            description: "A secure healthcare administration application developed using Core Java, Servlets, JSP, JDBC, and MySQL. Provides efficient patient registration, appointment management, and medical record persistence.",
            features: [
                "User Patient Registration & Authenticated Profile Access",
                "Doctor Appointment Booking & Dynamic Status Tracking",
                "JDBC Database Connectivity with Relational MySQL Persistence",
                "Structured Apache Tomcat Deployment with Maven Project Lifecycle"
            ],
            tech: ["Java", "JSP", "Servlets", "JDBC", "MySQL", "Maven", "Apache Tomcat"],
            github: "https://github.com/VaraPrasad-225/HospitalPatientPortal",
            live: "https://varaprasad-225.github.io/HospitalPatientPortal/"
        },
        ecommerce: {
            title: "2. E-Commerce Website",
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
            live: "https://varaprasad-225.github.io/ecommerce-website/"
        },
        product: {
            title: "3. Product Landing Page",
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
            live: "https://varaprasad-225.github.io/Product-Landing-Page/"
        },
        fest: {
            title: "4. College Fest Landing Page",
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
            live: "https://varaprasad-225.github.io/College-Fest-Landing-Page/"
        },
        tap: {
            title: "5. TAP Academy Frontend Clone",
            subtitle: "Learning Platform Interface Replica",
            icon: "fa-laptop-code",
            description: "A responsive frontend clone of the TAP Academy official learning portal homepage, course landing pages, and navigation framework.",
            features: [
                "Replicated Hero Banners and Course Selection Grids",
                "CSS Flexbox & Grid CSS Layout Architecture",
                "Cross-browser Responsive Touch Compatibility"
            ],
            tech: ["HTML5", "CSS3", "Flexbox", "Responsive Design"],
            github: "https://github.com/VaraPrasad-225/Tap-Academy-Clone",
            live: "https://varaprasad-225.github.io/Tap-Academy-Clone/"
        }
    };

    const modal = id("project-modal");
    const modalClose = id("modal-close");
    const modalBody = id("modal-body");
    const openDetailsBtns = document.querySelectorAll(".open-details-btn");

    function openProjectModal(projectKey) {
        const data = projectDetailsData[projectKey];
        if (!data || !modalBody || !modal) return;

        const techBadges = data.tech.map(t => `<span>${t}</span>`).join("");
        const featureItems = data.features.map(f => `<li>${f}</li>`).join("");
        const liveBtn = data.live 
            ? `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="project-btn live-demo-btn"><i class="fas fa-external-link-alt"></i> Open Live Demo</a>`
            : `<span class="project-btn disabled-btn" title="Backend application"><i class="fas fa-clock"></i> Live Demo (Coming Soon)</span>`;

        modalBody.innerHTML = `
            <div class="modal-header-icon"><i class="fas ${data.icon}"></i></div>
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-subtitle">${data.subtitle}</p>
            <p class="modal-description">${data.description}</p>
            
            <h4 class="modal-section-title">Key Features & Architecture:</h4>
            <ul class="modal-features">${featureItems}</ul>

            <h4 class="modal-section-title">Technologies Used:</h4>
            <div class="modal-tech-list project-tech">${techBadges}</div>

            <div class="modal-actions">
                <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="project-btn"><i class="fab fa-github"></i> View GitHub Repository</a>
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