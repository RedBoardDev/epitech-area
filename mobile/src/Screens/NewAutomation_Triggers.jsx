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
import { ServiceCard, TriggerReactionCard } from "../Components/ServiceCard";

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
        <View style={styles.cardContainer}>
          {serviceData && serviceData.map(service => (
            <ServiceCard key={service.id} service={service} onPress={() => { navigateToTriggers2(service.id) }} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function NewAutomation_Triggers2({ route }) {
  const { t } = useSettings();
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
    <View style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modal}>
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 30, marginBottom: 30 }}>{t("Parameters")}</Text>
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
      <ScrollView>
        <View style={styles.cardContainer}>
          {serviceData && serviceData.find(service => service.id === triggerServiceId).triggers.map(trigger => (
            <TriggerReactionCard key={trigger.id} elem={trigger} onPress={() => { openModal(trigger.id) }} />
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
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
