import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Button,
} from "react-native";

import {
  useNavigation,
  useTheme
} from "@react-navigation/native";

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
    navigateToLogin();
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Settings</Text>
      <Button title="Help" onPress={() => navigation.navigate("Help")} />
      <Button title="Logout" onPress={handleLogoutPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

