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

export default function Settings() {
  const navigation = useNavigation();
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "#fff", textAlign: "center", fontSize: 32, fontWeight: "bold" }}>Settings</Text>
      <View style={{ flex: 1 }}/>
      <Button title="Help" onPress={() => navigation.navigate("Help")} />
      <TouchableOpacity onPress={() => handleLogoutPress()} style={styles.logoutButton}>
        <Text style={ styles.textBtn }>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  logoutButton: {
    backgroundColor: "#EC6041",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    textAlign: "center",
  },
  textBtn: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

