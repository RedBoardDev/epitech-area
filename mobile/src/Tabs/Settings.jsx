import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  SafeAreaView
} from "react-native";

import {
  useNavigation,
  useTheme
} from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSettings } from "../Contexts/Settings";
import OptionSelect from "../Components/OptionSelect";

export default function Settings() {
  const navigation = useNavigation();
  const { settings, setSettings, t } = useSettings();
  const { colors } = useTheme();

  const navigateToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  const handleLogoutPress = () => {
    AsyncStorage.removeItem('jwtToken');
    navigateToLogin();
  };

  const setSelectedLanguage = (index) => setSettings({ ...settings, language: (index === 0 ? 'en' : 'fr') });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: colors.text, textAlign: "center", fontSize: 32, fontWeight: "bold" }}>{t("Settings")}</Text>
      <OptionSelect title={t("Language")} list={["English", "Français"]} selected={settings.language === 'en' ? 0 : 1} setSelected={setSelectedLanguage} />
      <TouchableOpacity onPress={() => navigation.navigate("ModifyAccount")} style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={styles.textBtn}>{t("Account")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLogoutPress()} style={[styles.button, { backgroundColor: colors.notification }]}>
        <Text style={styles.textBtn}>{t("Logout")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    margin: 20,
    textAlign: "center",
  },
  textBtn: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

