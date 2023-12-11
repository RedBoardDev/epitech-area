import React, {
  useContext,
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Button,
  SafeAreaView,
} from 'react-native';

import {
  useNavigation
} from '@react-navigation/native';

function LoginScreen() {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'NavBar' }],
    });
  };

  const handleLoginPress = () => {
    navigateToHome();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Login" onPress={handleLoginPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
