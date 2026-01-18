document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher Logic ---
    const themeBtn = document.querySelector('.theme-switch');
    const html = document.documentElement;

    // 1. Check LocalStorage for User Override
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } 

    // 2. Toggle Functionality
    themeBtn.addEventListener('click', () => {
        const currentAttribute = html.getAttribute('data-theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let newTheme;

        if (currentAttribute === 'dark') {
            newTheme = 'light';
        } else if (currentAttribute === 'light') {
            newTheme = 'dark';
        } else {
            newTheme = systemDark ? 'light' : 'dark';
        }

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Mobile Menu Logic (NEW) ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            // Toggle the 'active' class to show/hide the menu
            navLinks.classList.toggle('active');
            
            // Optional: Toggle icon styling or aria-expanded
            const isExpanded = navLinks.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when a link is clicked (good UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Logo Fade In Logic ---
    const logo = document.querySelector('.logo');
    const heroSection = document.querySelector('.hero');
    
    if (logo && heroSection) {
        window.addEventListener('scroll', () => {
            // Calculate when the bottom of the hero section passes the top of the viewport
            const triggerPoint = heroSection.getBoundingClientRect().bottom;
            
            // If the hero section is mostly scrolled out (e.g., top is negative), show logo
            // A simple fixed value often works better: e.g., scrollY > 150
            if (window.scrollY > 200) {
                logo.classList.add('visible');
            } else {
                logo.classList.remove('visible');
            }
        });
    }
});