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
import { useSettings } from '../Contexts/Settings';
import TextInput from "../Components/TextInput";
import { ServiceCard, TriggerReactionCard } from "../Components/ServiceCard";

export function NewAutomation_Reactions1({ route }) {
  const { settings } = useSettings();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { serviceData, triggerServiceId, triggerId, triggerParams } = route.params;

  const navigateToReactions2 = (reactionServiceId) => {
    navigation.navigate('Reactions2', { serviceData, triggerServiceId, triggerId, triggerParams, reactionServiceId });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.cardContainer}>
          {serviceData && serviceData.map(service => (
            <ServiceCard key={service.id} service={service} onPress={() => { navigateToReactions2(service.id) }} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function NewAutomation_Reactions2({ route }) {
  const { t } = useSettings();
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
            <Text style={{ fontSize: 30, marginBottom: 30 }}>{t("Parameters")}</Text>
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
      <ScrollView>
        <View style={styles.cardContainer}>
          {serviceData && serviceData.find(service => service.id === reactionServiceId).reactions.map(reaction => (
            <TriggerReactionCard key={reaction.id} elem={reaction} onPress={() => { openModal(reaction.id) }} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
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
