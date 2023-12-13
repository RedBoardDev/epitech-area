import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";

import {
  useNavigation,
  useTheme
} from "@react-navigation/native";

import Logo from '../Components/Logo'

import { getNbAutos, getNbServices } from "../Core/ServerCalls";

import SettingsContext from "../Contexts/Settings";

export default function Home() {
  const { colors } = useTheme();
  const { settings } = useContext(SettingsContext);
  const [nbServices, setNbServices] = useState(0);
  const [nbAutos, setNbAutos] = useState(0);

  const handleLogoutPress = () => {
    navigateToLogin();
  };

  useEffect(() => {
    const fetchNbServicesAutos = async () => {
      const data = await getNbServices(settings.apiLocation);
      const autos = await getNbAutos(settings.apiLocation);
      setNbServices(data);
      setNbAutos(autos);
    };

    fetchNbServicesAutos();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Logo/>
      <Text style={{ color: "#fff", textAlign: "center", fontSize: 32, fontWeight: "bold" }}>HarmonieWeb</Text>
      <Text style={{ color: "#fff", textAlign: "center", fontSize: 112, marginTop: 40 }}>{nbAutos}</Text>
      <Text style={{ color: "#fff", textAlign: "center", fontSize: 22, marginTop: 10 }}>Automation{(nbAutos > 1 ? "s" : "")}</Text>
      <Text style={{ color: "#fff", textAlign: "center", fontSize: 112, marginTop: 50 }}>{nbServices}</Text>
      <Text style={{ color: "#fff", textAlign: "center", fontSize: 22, marginTop: 10 }}>Service{(nbServices > 1 ? "s" : "")}</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  logoutButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
