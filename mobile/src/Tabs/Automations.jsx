import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ImageBackground,
  RefreshControl,
  Modal,
  Button,
} from "react-native";

import {
  useIsFocused,
  useNavigation,
  useTheme
} from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAutos, getImgByServiceId, getService, removeAuto } from '../Core/ServerCalls'

import LinearGradient from 'react-native-linear-gradient';
import { useSettings } from "../Contexts/Settings";
import Background from '../Components/Background'

const defaultImage = require("../../assets/logo.png");

export default function Automations() {
  const { settings, t } = useSettings();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [autos, setAutos] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [services, setServices] = useState({ k: {} });
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAuto, setSelectedAuto] = useState(null);

  useEffect(() => {
    const fetchAutos = async () => {
      const data = await getAutos(settings.apiBaseUrl);
      setAutos(data);
    };

    fetchAutos();

  }, [isFocused]);

  useEffect(() => {
    const fetchImages = async () => {
      if (autos) {
        let newImageUrls = {};
        for (let auto of autos) {
          try {
            const imageUrl = await getImgByServiceId(settings.apiBaseUrl, auto.trigger_service_id);
            newImageUrls[auto.trigger_service_id] = imageUrl;
          } catch (error) {
            console.error('Error fetching image:', error);
            newImageUrls[auto.trigger_service_id] = null;
          }
          try {
            const imageUrl = await getImgByServiceId(settings.apiBaseUrl, auto.reaction_service_id);
            newImageUrls[auto.reaction_service_id] = imageUrl;
          } catch (error) {
            console.error('Error fetching image:', error);
            newImageUrls[auto.reaction_service_id] = null;
          }
        }
        setImageUrls(newImageUrls);
      }
    };

    const fetchServices = async () => {
      if (autos) {
        let newServices = {};
        for (let auto of autos) {
          try {
            const json = await getService(settings.apiBaseUrl, auto.trigger_service_id);
            newServices[auto.trigger_service_id] = json;
          } catch (error) {
            console.error('Error fetching service:', error);
            newServices[auto.trigger_service_id] = null;
          }
          try {
            const json = await getService(settings.apiBaseUrl, auto.reaction_service_id);
            newServices[auto.reaction_service_id] = json;
          } catch (error) {
            console.error('Error fetching service:', error);
            newServices[auto.reaction_service_id] = null;
          }
        }
        setServices(newServices);
      }
    };

    fetchServices();
    fetchImages();
  }, [autos]);

  const handleLogoutPress = () => {
    navigateToLogin();
  };

  const rmOne = async (id) => {
    await removeAuto(settings.apiBaseUrl, id);
    const data = await getAutos(settings.apiBaseUrl);
    setAutos(data);
  }

  const removeAutomation = async (id) => {
    Alert.alert('Removal', 'Are you sure you want to remove this automation ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => rmOne(id) },
    ]);

  };

  const navigateToAddAutomation = () => {
    navigation.navigate("NewAutomation");
  };

  const getImageSource = (imageId) => {
    if (imageUrls && imageUrls[imageId]) {
      return { uri: imageUrls[imageId] + '?' + (new Date()).toISOString() };
    } else {
      return defaultImage;
    }
  };

  const getBackgroundGradient = (serviceId, serviceId1) => {
    const color = (services[serviceId] && services[serviceId].color) ? services[serviceId].color : '#fff';
    const color1 = (services[serviceId1] && services[serviceId1].color) ? services[serviceId1].color : '#fff';
    return [color, color1];
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const data = await getAutos(settings.apiBaseUrl);
    setAutos(data);
    setRefreshing(false);
  }, []);

  const openModal = (auto) => {
    setSelectedAuto(auto);
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAuto(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modal}>
        {selectedAuto && (
          <View style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{t("Automation name")}</Text>
                <Text style={{ fontSize: 15 }}>{selectedAuto.automation_name}</Text>
              </View>
              <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                <Image source={getImageSource(selectedAuto.trigger_service_id)} style={{ width: 50, height: 50, marginRight: 15 }} />
                <View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{t("Trigger")}</Text>
                  <Text style={{ fontSize: 15 }}>{services[selectedAuto.trigger_service_id].triggers.find(trigger => trigger.id === selectedAuto.trigger_id).name}</Text>
                </View>
              </View>
              <Image source={require("../../assets/down_arrow.png")} style={{ width: 50, height: 50, marginBottom: 10 }} />
              <View style={{ marginBottom: 30, flexDirection: 'row' }}>
                <Image source={getImageSource(selectedAuto.reaction_service_id)} style={{ width: 50, height: 50, marginRight: 15 }} />
                <View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{t("Reaction")}</Text>
                  <Text style={{ fontSize: 15 }}>{services[selectedAuto.reaction_service_id].reactions.find(reaction => reaction.id === selectedAuto.reaction_id).name}</Text>
                </View>
              </View>
              <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{t("Status")}</Text>
                <Text style={{ fontSize: 15 }}>{selectedAuto.active ? t("Active") : t("Inactive")}</Text>
              </View>
            </View>
            <View>
              <Button title="OK" onPress={closeModal} />
            </View>
          </View>
        )}
      </Modal>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={{ color: colors.text, textAlign: "center", fontSize: 32, fontWeight: "bold" }}>{t("Automations")}</Text>
      </View>
      <ScrollView style={{ flexDirection: "columns" }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={{ margin: 10 }}>
          {autos && autos.map(auto => (
            <TouchableOpacity key={auto.id} style={[styles.card, { backgroundColor: colors.card }]} onPress={() => { openModal(auto) }}>
              <Text style={styles.title}>{auto.automation_name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Image source={getImageSource(auto.trigger_service_id)} style={{ width: 25, height: 25, marginVertical: 1, marginLeft: 8 }} />
                <Image source={require("../../assets/right_arrow.png")} style={{ width: 25, height: 25, marginVertical: 1, marginLeft: 8 }} />
                <Image source={getImageSource(auto.reaction_service_id)} style={{ width: 25, height: 25, marginVertical: 1, marginLeft: 8 }} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddAutomation}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

  },
  card: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    color: '#333',
    width: '50%',
  },
  content: {
    fontSize: 16
  },
  minServiceImg: {
    width: 30,
    height: 30,
  },
  minServiceImgView: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    fontSize: 30,
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: "#000",
  },
  sideButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    borderRadius: 10,
    padding: 5,
    margin: 3,
    marginLeft: 0,
  },
  modal: {
    flex: 1,
  },
});
