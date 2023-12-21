import { createContext, useContext, useEffect, useState } from "react"

import en from './translations/en.json';
import fr from './translations/fr.json';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        language: "fr",
    });
    const languages = { en, fr };

    const setSettingsAndStore = (newSettings) => {
        setSettings(newSettings);
        localStorage.setItem('settings', JSON.stringify(newSettings));
    }

    const translate = (key) => {
        const lang = settings.language || 'en';
        if (!languages[lang][key])
            throw new Error(`No translation found for key ${key}`);
        return languages[lang][key];
    }

    useEffect(() => {
        const value = localStorage.getItem('settings');
        if (value !== null) {
            if (settings)
                setSettingsAndStore({ ...JSON.parse(value), ...settings });
            else
                setSettings(JSON.parse(value));
        }
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, setSettings: setSettingsAndStore, t: translate }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
