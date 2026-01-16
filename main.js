document.addEventListener('DOMContentLoaded', () => {
    // --- Accordion Logic ---
    const eduHeaders = document.querySelectorAll('.edu-header');

    eduHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('collapsed');
        });
    });

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
            // User was manually dark -> switch to light
            newTheme = 'light';
        } else if (currentAttribute === 'light') {
            // User was manually light -> switch to dark
            newTheme = 'dark';
        } else {
            // No attribute set (using system default)
            // If system is dark, switch to light. If system is light, switch to dark.
            newTheme = systemDark ? 'light' : 'dark';
        }

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});