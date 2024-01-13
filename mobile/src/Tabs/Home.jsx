import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";

import {
  useNavigation,
  useTheme
} from "@react-navigation/native";

import Logo from '../Components/Logo'

import { getNbAutos, getNbServices, getUserInfos } from "../Core/ServerCalls";

import { useSettings } from "../Contexts/Settings";

const screenWidth = Dimensions.get('window').width;

function Card({ title, value, color }) {
  return (
    <View style={{ backgroundColor: color, borderRadius: 10, marginTop: 20, padding: 20, width: '100%', }}>
      <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>{title}</Text>
      <Text style={{ color: "#000", fontSize: 15 }}>{value}</Text>
    </View>
  )
}

export default function Home() {
  const { colors } = useTheme();
  const { settings, t } = useSettings();
  const [nbServices, setNbServices] = useState(0);
  const [nbAutos, setNbAutos] = useState(0);
  const [userName, setUserName] = useState("");

  const handleLogoutPress = () => {
    navigateToLogin();
  };

  useEffect(() => {
    const fetchNbServicesAutos = async () => {
      const data = await getNbServices(settings.apiBaseUrl);
      const autos = await getNbAutos(settings.apiBaseUrl);
      setNbServices(data);
      setNbAutos(autos);
    };

    fetchNbServicesAutos();

    const fetchUserName = async () => {
      const user = await getUserInfos(settings.apiBaseUrl);
      setUserName(user.firstname);
    };

    fetchUserName();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Logo />
      </View>
      <Text style={{ color: colors.text, textAlign: "center", fontSize: 32, fontWeight: "bold" }}>Dashboard</Text>
      <Text style={{ color: colors.text, fontSize: 22, marginHorizontal: 20, marginTop: 10, fontWeight: "bold" }}>{t("Welcome, ") + userName}</Text>
      <ScrollView>
        <Card title={t("Total active automations")} value={nbAutos} color={"#cdb4db"} />
        <Card title={t("Total connected services")} value={0} color={"#ffc8dd"} />
        <Card title={t("Total comments")} value={0} color={"#bde0fe"} />
        <Card title={t("Total likes")} value={0} color={"#a2d2ff"} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  cardLeft: {
    backgroundColor: 'rgba(55, 155, 255, 0.3)',
    borderRadius: 15,
    marginTop: 50,
    padding: 20,
    paddingRight: 40,
    width: '100%',
    transform: [
      { translateX: -screenWidth / 2 + 100 },
    ],
  },

  cardRight: {
    backgroundColor: 'rgba(0, 255, 55, 0.3)',
    borderRadius: 15,
    marginTop: 20,
    padding: 20,
    paddingLeft: 40,
    width: '100%',
    transform: [
      { translateX: screenWidth / 2 - 100 },
    ],
  },

  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
