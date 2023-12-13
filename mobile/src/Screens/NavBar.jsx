import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../Tabs/Home';
import Settings from '../Tabs/Settings';
import Icon from '../Components/Icon';

export default function NavBar() {
  const Tab = createBottomTabNavigator();
  const { colors } = useTheme();

  useEffect(() => {
  }, []);

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.text,
    })}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarLabel: () => { return null },
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? "home.png" : "home-outline.png"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarLabel: () => { return null },
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? "settings.png" : "settings-outline.png"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
});
