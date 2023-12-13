import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Appearance,
  Image,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/Screens/Login';
import RegisterScreen from './src/Screens/Register';
import NavBar from './src/Screens/NavBar';
import NewAutomation from './src/Screens/NewAutomation';

import Help from './src/Help';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { WorkingToken } from './src/Core/ServerCalls';

function App() {
  const [settings, setSettings] = React.useState({});
  const Stack = createStackNavigator();

  const [initialRouteName, setInitialRouteName] = React.useState(null);

  const Light = { "colors": { "background": "rgb(242, 242, 242)", "border": "rgb(216, 216, 216)", "card": "rgb(255, 255, 255)", "notification": "rgb(255, 59, 48)", "primary": "rgb(0, 122, 255)", "text": "rgb(28, 28, 30)" }, "dark": false }
  const Dark = { "colors": { "background": "rgb(1, 1, 1)", "border": "rgb(39, 39, 41)", "card": "rgb(22, 22, 22)", "notification": "rgb(255, 69, 58)", "primary": "rgb(10, 132, 255)", "text": "rgb(229, 229, 231)" }, "dark": true }

  const getColorTheme = () => {
    const theme = settings.colorTheme || "dark";
    if (theme === 'adaptive')
      return Appearance.getColorScheme();
    else
      return theme;
  }

  React.useEffect(() => {
    const CheckConnected = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (await WorkingToken(token) == true) {
        setInitialRouteName("NavBar");
      } else {
        setInitialRouteName("LoginScreen");
      }
    }

    CheckConnected();
  }, []);

  if (initialRouteName === null) {
    return;
  }

  return (
    <NavigationContainer theme={getColorTheme() === "dark" ? Dark : Light}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
        <Stack.Screen name="NavBar" component={NavBar} options={{ headerShown: false }} />
        <Stack.Screen name="NewAutomation" component={NewAutomation} options={{ headerShown: true }} />
      </Stack.Navigator>
      <StatusBar style={getColorTheme() === "dark" ? "light" : "dark"} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;
