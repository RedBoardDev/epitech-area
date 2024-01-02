import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { createTheme} from "@mui/material/styles";

const ThemeContext = createContext();

export const MyThemeProvider = ({ children }) => {
    const [toggleThemeMode, setToggleThemeMode] = useState(true);
    
    const toggleSwitchTheme = () => {
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
            TextField: {
                main: '#0b7d68',
            },
            mainBackground: {
                main: toggleThemeMode ? '#212121' : '#FFF',
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