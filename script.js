// --- PROJECT DATA ---
// Add new projects to these arrays to automatically update the portfolio!

const featuredProjects = [
    {
        title: "Projectile Motion Simulator",
        image: "images/projectile.png",
        tags: ["C", "ncurses", "Physics"],
        description: "Live 60fps ncurses animation of ballistic trajectories. Physics equations + dynamic terminal scaling. Gnuplot export.",
        github: "https://github.com/Raghu-ram12/projectile_motion_simulation",
        demo: "demo_videos/projectile_demo.mp4"
    },
    {
        title: "Snake Game",
        image: "images/snake_game.png",
        tags: ["C", "ncurses"],
        description: "Classic arcade game in terminal. Collision detection, score tracking, smooth 60fps controls.",
        github: "https://github.com/Raghu-ram12/projects/blob/main/snakegame.c",
        demo: "demo_videos/snake_game_demo.mp4"
    }
];

const moreProjects = [
    {
        title: "Employee Management System",
        image: "images/employee.png",
        tags: ["C", "Linked Lists"],
        description: "Console app with file I/O, data structures, search/sort. Full CRUD operations.",
        github: "https://github.com/Raghu-ram12/projects/blob/main/employemanagement.c",
        demo: ""
    },
    {
        title: "Linear Regression from Scratch",
        image: "images/logo.png",
        tags: ["Python", "NumPy"],
        description: "Linear regression implementation from scratch using numpy and pandas.",
        github: "https://github.com/Raghu-ram12/machine_learning_projects",
        demo: ""
    },
    {
        title: "Gesture Controlled Volume",
        image: "images/gesture_volume.png",
        tags: ["Python", "OpenCV"],
        description: "Adjusts the volume based on the gap between index and thumb built using open cv and media pipe.",
        github: "https://github.com/Raghu-ram12/open_cv_projects",
        demo: "demo_videos/volume_control_demo.mp4"
    }
];

// --- RENDER PROJECTS ---
function renderProjects() {
    const featuredContainer = document.getElementById('featured-projects-container');
    const moreContainer = document.getElementById('more-projects-container');

    if (featuredContainer) {
        let featuredHTML = '';
        featuredProjects.forEach((proj, index) => {
            const isReverse = index % 2 !== 0 ? 'reverse' : '';
            const tagsHTML = proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            const demoLink = proj.demo ? `<a href="${proj.demo}"><i class="fas fa-video"></i> Demo</a>` : '';
            
            featuredHTML += `
                <div class="featured-project-alt ${isReverse}">
                    <div class="project-image">
                        <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                    </div>
                    <div class="project-info glass-card">
                        <h3>${proj.title}</h3>
                        <div class="project-tags">
                            ${tagsHTML}
                        </div>
                        <p>${proj.description}</p>
                        <div class="project-links">
                            <a href="${proj.github}" target="_blank"><i class="fab fa-github"></i> Code</a>
                            ${demoLink}
                        </div>
                    </div>
                </div>
            `;
        });
        featuredContainer.innerHTML = featuredHTML;
    }

    if (moreContainer) {
        let moreHTML = '';
        moreProjects.forEach(proj => {
            const tagsHTML = proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            const demoLink = proj.demo ? `<a href="${proj.demo}"><i class="fas fa-video"></i> Demo</a>` : '';
            
            moreHTML += `
                <div class="project-card glass-card">
                    <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                    <div class="card-content">
                        <h3>${proj.title}</h3>
                        <div class="project-tags">${tagsHTML}</div>
                        <p>${proj.description}</p>
                        <div class="project-links">
                            <a href="${proj.github}" target="_blank"><i class="fab fa-github"></i> Code</a>
                            ${demoLink}
                        </div>
                    </div>
                </div>
            `;
        });
        moreContainer.innerHTML = moreHTML;
    }
}

// Call render before setting up observers
renderProjects();

// --- EXISTING SCROLL AND ANIMATION LOGIC ---

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.style.display === 'flex' || navLinks.classList.contains('active')) {
                navLinks.style.display = 'none';
                navLinks.classList.remove('active');
            }
        }
    });
});

// Mobile menu toggle with smooth animation
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navLinks.style.display = navLinks.classList.contains('active') ? 'flex' : 'none';
    menuToggle.classList.toggle('active');
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards and skill categories for animation
document.querySelectorAll('.project-card, .skill-category, .about-text, .featured-project-alt, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
    } else {
        // Scrolling up
        navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
