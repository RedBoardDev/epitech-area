import { createContext, useContext, useEffect, useState } from "react"

import fr from './translations/fr.json';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({});
    const languages = { fr };

    const setSettingsAndStore = (newSettings) => {
        setSettings(newSettings);
        localStorage.setItem('settings', JSON.stringify(newSettings));
    };

    const translate = (key) => {
        const lang = settings.language || 'en';
        if (lang === 'en') return key;
        if (!languages[lang][key]) throw new Error(`No translation found for key ${key}`);
        return languages[lang][key];
    };

    useEffect(() => {
        const savedSettings = localStorage.getItem('settings');
        const defaultSettings = { language: 'en', theme: 'light' };

        if (!savedSettings || savedSettings.length === 0) {
            setSettingsAndStore(defaultSettings);
        } else {
            const parsedSettings = JSON.parse(savedSettings);

            const mergedSettings = {
                ...defaultSettings,
                ...parsedSettings,
            };
            setSettingsAndStore(mergedSettings);
        }
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, setSettings: setSettingsAndStore, t: translate, languages }}>
            {children}
        </SettingsContext.Provider>
    );
};
export const useSettings = () => useContext(SettingsContext);
