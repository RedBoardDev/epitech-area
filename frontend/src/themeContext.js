import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { createTheme} from "@mui/material/styles";

const ThemeContext = createContext();

export const MyThemeProvider = ({ children }) => {
    const [data, setData] = useState()
    const getBooleanConvertedValue = (data) => {
        return data ? JSON.parse(data) : null;
    }
    const [toggleThemeMode, setToggleThemeMode] = useState(getBooleanConvertedValue(data));
    
    useEffect(() => {
        const storedData = localStorage.getItem('themeData');
        const convertedData = getBooleanConvertedValue(storedData);
        if (convertedData != null) {
            setData(convertedData);
            setToggleThemeMode(convertedData);
        }
    }, []);
    const UpdateThemeData = (data) => {
        setToggleThemeMode(data);
        setData(data);
        localStorage.setItem('themeData', JSON.stringify(data));
    }
    const toggleSwitchTheme = () => {
        UpdateThemeData(!toggleThemeMode);
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