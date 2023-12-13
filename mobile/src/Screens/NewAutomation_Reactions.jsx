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
import { getServices } from '../Core/ServerCalls';
import config from '../config';

export function NewAutomation_Reactions1({ route }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { serviceData, triggerServiceId, triggerId, triggerParams } = route.params;

  const navigateToReactions2 = (reactionServiceId) => {
    navigation.navigate('Reactions2', { serviceData, triggerServiceId, triggerId, triggerParams, reactionServiceId });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {serviceData && serviceData.map(service => (
          <TouchableOpacity style={[styles.card, styles.cardService]} key={service.id} onPress={() => { navigateToReactions2(service.id) }}>
            <Image style={styles.image} source={{ uri: `${config.API_BASE_URL}/${service.icon}` }} />
            <View style={styles.infoContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>{service.name}</Text>
              </View>
              <Text style={styles.content}>{service.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function NewAutomation_Reactions2({ route }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { serviceData, triggerServiceId, triggerId, triggerParams, reactionServiceId } = route.params;

  const navigateToSubmit = (reactionId) => {
    navigation.navigate('Submit', { serviceData, triggerServiceId, triggerId, triggerParams, reactionServiceId, reactionId, reactionParams: {} });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Chose a reaction</Text>
      <ScrollView>
        {serviceData && serviceData.find(service => service.id === reactionServiceId).reactions.map(reaction => (
          <TouchableOpacity style={styles.card} key={reaction.id} onPress={() => { navigateToSubmit(reaction.id) }}>
            <View style={styles.header}>
              <Text style={styles.title}>{reaction.name}</Text>
            </View>
            <Text style={styles.content}>{reaction.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginLeft: "2%",
    width: "96%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  cardService: {
    flexDirection: "row",
    padding: 10,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },

  header: {
    padding: 20,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  content: {
    padding: 10,
    fontSize: 15,
  },
});
