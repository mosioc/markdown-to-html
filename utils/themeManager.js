const THEME_KEY = 'md_theme';


// theme setter 
export const setTheme = (theme) => {

    document.body.className = theme;

    // save to localStorage 
    localStorage.setItem(THEME_KEY, theme);

    // 'theme-toggle' btn defined in index.html
    const themeToggleButton = document.getElementById('theme-toggle');

    if (themeToggleButton) {
        themeToggleButton.innerHTML = theme === 'dark-mode' ? '☀️' : '🌙';
    }

    console.info('theme set to:', theme);
};

// theme getter
export const getTheme = () => {

    //  retrieve from localStorage
    const savedTheme = localStorage.getItem(THEME_KEY);

    // if found return it
    if (savedTheme) {
        return savedTheme;
    }

    // else, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark-mode';
    }

    // default = light mode
    return 'light-mode';
};

export const toggleTheme = () => {
    const currentTheme = document.body.className.includes('dark-mode')
        ? 'dark-mode' : 'light-mode';

    const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';

    setTheme(newTheme);
    return newTheme;
};

export const initThemeManager = () => {

    const initialTheme = getTheme();

    setTheme(initialTheme);

    // listen for theme toggle
    const themeToggleButton = document.getElementById('theme-toggle');

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
};