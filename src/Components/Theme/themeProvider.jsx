/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';
import './theme.scss';

const ThemeContext = createContext({
    isDarkTheme: false,
    toggleTheme: () => { },
});

const ThemeProvider = ({ children }) => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme ? (storedTheme === 'dark' ? true : false) : prefersDarkMode;
    const [isDarkTheme, setIsDarkTheme] = useState(initialTheme);

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => {
            const newTheme = !prevTheme;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    const theme = {
        isDarkTheme,
        toggleTheme,
    };

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkTheme);
    }, [isDarkTheme]);

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, useTheme };