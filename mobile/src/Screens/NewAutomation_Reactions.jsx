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
  Button,
} from "react-native";

import {
  useNavigation,
  useTheme
} from "@react-navigation/native";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getServices } from '../Core/ServerCalls';
import { useContext } from 'react';
import SettingsContext from '../Contexts/Settings';
import TextInput from "../Components/TextInput";

export function NewAutomation_Reactions1({ route }) {
  const { settings } = useContext(SettingsContext);
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

export function NewAutomation_Reactions2({ route }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { serviceData, triggerServiceId, triggerId, triggerParams, reactionServiceId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactionParams, setReactionParams] = useState({});

  const navigateToSubmit = (reactionId) => {
    setModalVisible(false);
    navigation.navigate('Submit', { serviceData, triggerServiceId, triggerId, triggerParams, reactionServiceId, reactionId, reactionParams });
  }

  const openModal = (reactionId) => {
    setSelectedReaction(serviceData.find(service => service.id === reactionServiceId).reactions.find(reaction => reaction.id === reactionId));
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
          onChangeText={(text) => { setReactionParams({ ...reactionParams, [field.id]: text }) }}
          value={reactionParams[field.id]}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modal}>
      <SafeAreaView style={styles.container}>

        <KeyboardAwareScrollView style={{ padding: 20 }}>
          <Text style={{ fontSize: 30, marginBottom: 30 }}>Parameters</Text>
          {selectedReaction && selectedReaction.fields.map(field => {
            if (field.type === 'text') {
              return RenderTextInput(field);
            } else {
              return null;
            }
          })}
          <Button title="OK" onPress={() => { navigateToSubmit(selectedReaction.id); }} />
        </KeyboardAwareScrollView>
        </SafeAreaView>
      </Modal>
      <Text>Chose a reaction</Text>
      <ScrollView>
        {serviceData && serviceData.find(service => service.id === reactionServiceId).reactions.map(reaction => (
          <TouchableOpacity style={styles.card} key={reaction.id} onPress={() => { openModal(reaction.id) }}>
            <View style={styles.header}>
              <Text style={styles.title}>{reaction.name}</Text>
            </View>
            <Text style={styles.content}>{reaction.description}</Text>
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
});
