import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Modal,
  Button
} from "react-native";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  useNavigation,
  useTheme
} from "@react-navigation/native";

import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { useSettings } from '../Contexts/Settings';
import TextInput from "../Components/TextInput";

export function NewAutomation_Triggers1({ route }) {
  const { settings } = useSettings();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { serviceData } = route.params;
  const [serviceLogos, setServiceLogos] = useState({});

  const navigateToTriggers2 = (triggerServiceId) => {
    navigation.navigate('Triggers2', { serviceData, triggerServiceId });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {serviceData && serviceData.map(service => (
          <TouchableOpacity style={[styles.card, styles.cardService]} key={service.id} onPress={() => { navigateToTriggers2(service.id) }}>
            <Image style={styles.image} source={{ uri: `${settings.apiLocation}/${service.icon}` }} />
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

export function NewAutomation_Triggers2({ route }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { serviceData, triggerServiceId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [triggerParams, setTriggerParams] = useState({});

  const navigateToReactions1 = (triggerId) => {
    setModalVisible(false);
    navigation.navigate('Reactions1', { serviceData, triggerServiceId, triggerId, triggerParams });
  }

  const openModal = (triggerId) => {
    setSelectedTrigger(serviceData.find(service => service.id === triggerServiceId).triggers.find(trigger => trigger.id === triggerId));
    setModalVisible(true);
  }

  const RenderTextInput = (field) => {
    return (
      <View key={field.id}>
        <Text>{field.name}</Text>
        <TextInput
          style={styles.input}
          placeholder={field.description}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => { setTriggerParams({ ...triggerParams, [field.id]: text }) }}
          value={triggerParams[field.id]}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
    );
  }

  return (
    <View>
    <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modal}>
        <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView style={{ padding: 20 }}>
          <Text style={{ fontSize: 30, marginBottom: 30 }}>Parameters</Text>
          {selectedTrigger && selectedTrigger.fields.map(field => {
            if (field.type === 'text') {
              return RenderTextInput(field);
            } else {
              return null;
            }
          })}
          <Button title="OK" onPress={() => { navigateToReactions1(selectedTrigger.id); }} />
        </KeyboardAwareScrollView>
        </SafeAreaView>
      </Modal>
      <Text>Chose a trigger</Text>
      <ScrollView>
        {serviceData && serviceData.find(service => service.id === triggerServiceId).triggers.map(trigger => (
          <TouchableOpacity style={styles.card} key={trigger.id} onPress={() => { openModal(trigger.id) }}>
            <View style={styles.header}>
              <Text style={styles.title}>{trigger.name}</Text>
            </View>
            <Text style={styles.content}>{trigger.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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

  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
});
