// Initialize Swiper
const swiper = new Swiper('.project-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// Projects data
const projects = [
    {
        name: "Nimbly",
        description: "C# проект",
        tech: "C#",
        link: "https://github.com/MilkyCoding/Nimbly"
    },
    {
        name: "MagicWands",
        description: "Плагин для сервера Minecraft, добавляющий магические палочки",
        tech: "Java",
        link: "https://github.com/MilkyCoding/MagicWands"
    },
    {
        name: "ZombieVirus",
        description: "Minecraft плагин с системой зомби-вируса",
        tech: "Java",
        link: "https://github.com/MilkyCoding/ZombieVirus"
    },
    {
        name: "NexusFlow",
        description: "UI/UX Design Лендинг",
        tech: "HTML/CSS",
        link: "https://github.com/MilkyCoding/NexusFlow"
    },
    {
        name: "FloatPic",
        description: "Отображение изображений поверх окон",
        tech: "Python",
        link: "https://github.com/MilkyCoding/FloatPic"
    },
    {
        name: "Trackly",
        description: "Умное отслеживание цен в Telegram",
        tech: "Python",
        link: "https://github.com/MilkyCoding/Trackly"
    }
];

// Function to create project slides
function loadProjects() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    projects.forEach(project => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="gradient-border p-6 rounded-lg bg-dark-lighter project-card">
                <div class="project-card-content">
                    <h3 class="text-xl font-semibold mb-4">${project.name}</h3>
                    <p class="text-gray-400 project-card-description">${project.description}</p>
                    <div class="mt-auto">
                        <span class="inline-block px-3 py-1 rounded-full text-sm bg-primary/20 text-primary">${project.tech}</span>
                        <a href="${project.link}" target="_blank" class="mt-4 text-primary hover:text-secondary transition-colors block">
                            Подробнее <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        swiperWrapper.appendChild(slide);
    });

    swiper.update();
}

// Mobile menu functionality
function initMobileMenu() {
    const menuButton = document.querySelector('nav button');
    const menuItems = document.querySelector('nav div.hidden');

    menuButton.addEventListener('click', () => {
        menuItems.classList.toggle('hidden');
        menuItems.classList.toggle('flex');
        menuItems.classList.toggle('flex-col');
        menuItems.classList.toggle('absolute');
        menuItems.classList.toggle('top-full');
        menuItems.classList.toggle('left-0');
        menuItems.classList.toggle('w-full');
        menuItems.classList.toggle('bg-dark');
        menuItems.classList.toggle('p-4');
    });
}

// Smooth scroll functionality
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Mouse move effect for cards
function initMouseMoveEffect() {
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.hover-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Enhanced scroll animations
function initAnimationObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                
                // Add stagger effect to child elements
                const children = entry.target.querySelectorAll('.hover-card, .glass-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });

    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
        
        // Prepare stagger animation
        const children = section.querySelectorAll('.hover-card, .glass-card');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-gradient');
        const heroContent = hero.querySelector('.container');
        
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initMobileMenu();
    initSmoothScroll();
    initAnimationObserver();
    initMouseMoveEffect();
    initParallaxEffect();
}); 