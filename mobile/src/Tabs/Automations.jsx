import React, { useState, useEffect } from "react";

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
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAutos } from '../Core/ServerCalls'

export default function Automations() {
  const { colors } = useTheme();
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    const fetchAutos = async () => {
      const data = await getAutos(await AsyncStorage.getItem('jwtToken'));
      console.log(data);
      setAutos(data);
    };

    fetchAutos();
  }, []);

  const handleLogoutPress = () => {
    navigateToLogin();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity>
          {autos && autos.map(auto => (
          <View style={styles.card} key={auto.id}>
            <View style={styles.header}>
              <Text style={styles.title}>Automation {auto.id}</Text>
            </View>
            <Text style={styles.content}>{auto.trigger_service_id} -> {auto.reaction_service_id}</Text>
          </View>
          ))}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  content: {
    fontSize: 16
  },
});
