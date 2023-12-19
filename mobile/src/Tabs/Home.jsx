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
} from "react-native";

import {
  useNavigation,
  useTheme
} from "@react-navigation/native";

import Logo from '../Components/Logo'

import { getNbAutos, getNbServices } from "../Core/ServerCalls";

import SettingsContext from "../Contexts/Settings";

const screenWidth = Dimensions.get('window').width;

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
    <ImageBackground blurRadius={15} source={require("../../assets/back.png")} resizeMode="cover" style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>
      <Logo/>
      <Text style={{ color: "#fff", textAlign: "center", fontSize: 32, fontWeight: "bold" }}>HarmonieWeb</Text>
      <View style={ styles.cardLeft}>
      <Text style={{ color: "#fff", textAlign: "right", fontSize: 112 }}>{nbAutos}</Text>
      <Text style={{ color: "#fff", textAlign: "right", fontSize: 22, marginTop: 10 }}>🤖 Automation{(nbAutos > 1 ? "s" : "")}</Text>
      </View>
      <View style={ styles.cardRight}>
      <Text style={{ color: "#fff", textAlign: "left", fontSize: 112 }}>{nbServices}</Text>
      <Text style={{ color: "#fff", textAlign: "left", fontSize: 22, marginTop: 10 }}>Service{(nbServices > 1 ? "s" : "")} ⚙️</Text>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  cardLeft : {
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

  cardRight : {
    backgroundColor: 'rgba(0, 255, 55, 0.3)',
    borderRadius: 15,
    marginTop: 50,
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
