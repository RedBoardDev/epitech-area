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

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getServices, addNewAutomation } from '../Core/ServerCalls';
import { NewAutomation_Triggers1, NewAutomation_Triggers2 } from "./NewAutomation_Triggers";
import { NewAutomation_Reactions1, NewAutomation_Reactions2 } from "./NewAutomation_Reactions";
import Button from "../Components/Button";
import config from '../config';

function NewAutomation_Submit({ route }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { serviceData, triggerServiceId, triggerId, triggerParams, reactionServiceId, reactionId, reactionParams } = route.params;
  const [triggerService, setTriggerService] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const [reactionService, setReactionService] = useState(null);
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    setTriggerService(serviceData.find(service => service.id === triggerServiceId));
    setTrigger(serviceData.find(service => service.id === triggerServiceId).triggers.find(trigger => trigger.id === triggerId));
    setReactionService(serviceData.find(service => service.id === reactionServiceId));
    setReaction(serviceData.find(service => service.id === reactionServiceId).reactions.find(reaction => reaction.id === reactionId));
  }, []);

  const submit = async () => {
    console.log('triggerServiceId', triggerServiceId);
    console.log('triggerId', triggerId);
    console.log('triggerParams', triggerParams);
    console.log('reactionServiceId', reactionServiceId);
    console.log('reactionId', reactionId);
    console.log('reactionParams', reactionParams);
    const token = await AsyncStorage.getItem('jwtToken');
    addNewAutomation(token, triggerServiceId, triggerId, triggerParams, reactionServiceId, reactionId, reactionParams).then(() => {
      navigation.navigate('AutomationsTab');
    }).catch((error) => {
      console.error(error);
      Alert.alert('Error', 'Failed to add new automation');
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.card, styles.cardService]}>
        <Image style={styles.image} source={{ uri: `${config.API_BASE_URL}/${triggerService?.icon}` }} />
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{triggerService?.name}</Text>
          </View>
          <Text style={styles.content}>{trigger?.name}</Text>
        </View>
      </View>
      <Image style={styles.arrow} source={require('../../assets/down_arrow.png')} tintColor={colors.text} />
      <View style={[styles.card, styles.cardService]}>
        <Image style={styles.image} source={{ uri: `${config.API_BASE_URL}/${reactionService?.icon}` }} />
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{reactionService?.name}</Text>
          </View>
          <Text style={styles.content}>{reaction?.name}</Text>
        </View>
      </View>
      <Button onPress={submit}>Submit</Button>
    </SafeAreaView>
  );
}

export default function NewAutomation() {
  const Stack = createNativeStackNavigator();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [services, setServices] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices(await AsyncStorage.getItem('jwtToken'));
      setServices(data);
    };

    fetchServices();
  }, []);

  return (
    services &&
    <Stack.Navigator>
      <Stack.Screen name="Triggers1" options={{ title: "Chose a service for your trigger" }} component={NewAutomation_Triggers1} initialParams={{ serviceData: services }} />
      <Stack.Screen name="Triggers2" options={{ title: "Chose a trigger" }} component={NewAutomation_Triggers2} initialParams={{ serviceData: services }} />
      <Stack.Screen name="Reactions1" options={{ title: "Chose a service for your reaction" }} component={NewAutomation_Reactions1} initialParams={{ serviceData: services }} />
      <Stack.Screen name="Reactions2" options={{ title: "Chose a reaction" }} component={NewAutomation_Reactions2} initialParams={{ serviceData: services }} />
      <Stack.Screen name="Submit" options={{ title: "Submit" }} component={NewAutomation_Submit} initialParams={{ serviceData: services }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
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

  arrow: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
