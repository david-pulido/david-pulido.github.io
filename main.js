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
});