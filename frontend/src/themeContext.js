import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { createTheme} from "@mui/material/styles";

const ThemeContext = createContext();

export const MyThemeProvider = ({ children }) => {
    const [toggleThemeMode, setToggleThemeMode] = useState(false);

    useEffect(() => {
        const value = localStorage.getItem('settings');
        const settings = JSON.parse(value);
        if (settings && settings.theme) {
            setToggleThemeMode(settings.theme === 'dark');
        }
    }, []);

    const toggleSwitchTheme = () => {
        const value = localStorage.getItem('settings');
        const settings = JSON.parse(value);
        settings.theme = settings.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('settings', JSON.stringify(settings));
        setToggleThemeMode((prevMode) => !prevMode);
    }

    const mainTheme = createTheme({
        palette: {
            mode: toggleThemeMode ? 'dark' : 'light',
            primary: {
                main: '#562075',
            },
            secondary: {
                main: '#155e31',
            },
            ForegroundItems: {
                main: toggleThemeMode ? '#222222' : '#41445E',
            },
            SwitchStyle: {
                main: toggleThemeMode ? '#FDFFF9' : '#121212',
            },
            TextField1: {
                main: toggleThemeMode ? '#FDFFF9' : '#825D97',
            },
            TextStyle1: {
                main: toggleThemeMode ? '#FDFFF9' : '#825D97',
            },
            mainBackground: {
                main: toggleThemeMode ? '#121212' : '#f0f1f5',
            },
            CardContentTitle: {
                main: toggleThemeMode ?  '#FDFFF9' : '#333333',
            },
        },
    });

    const contextValue = {
        mainTheme,
        toggleThemeMode,
        toggleSwitchTheme,
    };

    return(
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);