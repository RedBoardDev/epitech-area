import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

import fr from '../../translations/fr.json';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        apiLocation: `http://10.137.158.160:6500`,
        apiBaseUrl: `http://10.137.158.160:6500/fr`,
        language: "fr",
    });
    const languages = { fr };

    useEffect(() => {
        setSettings(prev => ({ ...prev, apiBaseUrl: `${prev.apiLocation}/${prev.language}` }));
    }, [settings.apiLocation, settings.language]);

    const setSettingsAndStore = (newSettings) => {
        setSettings(newSettings);
        AsyncStorage.setItem('settings', JSON.stringify(newSettings));
    }

    const translate = (key) => {
        const lang = settings.language || 'en';
        if (lang === 'en')
            return key;
        if (!languages[lang][key])
            throw new Error(`No translation found for key ${key}`);
        return languages[lang][key];
    }

    useEffect(() => {
        AsyncStorage.getItem('settings').then((value) => {
            if (value !== null) {
                if (settings)
                    setSettingsAndStore({ ...JSON.parse(value), ...settings });
                else
                    setSettings(JSON.parse(value));
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, setSettings: setSettingsAndStore, t: translate }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
