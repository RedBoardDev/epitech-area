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
      <Text style={{ color: colors.text }}>Settings</Text>
      <Button title="Help" onPress={() => navigation.navigate("Help")} />
      <Button title="Logout" onPress={handleLogoutPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

