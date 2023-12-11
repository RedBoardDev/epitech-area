import React from "react";

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

export default function Home() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const navigateToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  const handleLogoutPress = () => {
    navigateToLogin();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: colors.text }}>Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
