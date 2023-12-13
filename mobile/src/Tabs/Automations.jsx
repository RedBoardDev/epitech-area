import React, { useState, useEffect, useContext } from "react";

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
  useIsFocused,
  useNavigation,
  useTheme
} from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAutos, getImgByServiceId, getService } from '../Core/ServerCalls'

import LinearGradient from 'react-native-linear-gradient';
import SettingsContext from "../Contexts/Settings";

const defaultImage = require("../../assets/logo.png");

export default function Automations() {
  const { settings } = useContext(SettingsContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [autos, setAutos] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [services, setServices] = useState({ k: {} });
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchAutos = async () => {
      const data = await getAutos(settings.apiLocation, await AsyncStorage.getItem('jwtToken'));
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
            const imageUrl = await getServiceIcon(settings.apiLocation, auto.trigger_service_id);
            newImageUrls[auto.trigger_service_id] = imageUrl;
          } catch (error) {
            console.error('Error fetching image:', error);
            newImageUrls[auto.trigger_service_id] = null;
          }
          try {
            const imageUrl = await getServiceIcon(settings.apiLocation, auto.reaction_service_id);
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
            const json = await getServices(settings.apiLocation, auto.trigger_service_id);
            newServices[auto.trigger_service_id] = json;
          } catch (error) {
            console.error('Error fetching service:', error);
            newServices[auto.trigger_service_id] = null;
          }
          try {
            const json = await getServices(settings.apiLocation, auto.reaction_service_id);
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

  const navigateToAddAutomation = () => {
    navigation.navigate("NewAutomation");
  };

  const getServiceIcon = async (apiLocation, serviceId) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await getImgByServiceId(apiLocation, token, serviceId);
    return response;
  }

  const getServices = async (apiLocation, serviceId) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await getService(apiLocation, token, serviceId);
    return response;
  }

  const getImageSource = (imageId) => {
    if (imageUrls && imageUrls[imageId]) {
      return { uri: imageUrls[imageId] };
    } else {
      return defaultImage;
    }
  };

  const getBackgroundGradient = (serviceId, serviceId1) => {
    const color = (services[serviceId] && services[serviceId].color) ? services[serviceId].color : '#fff';
    const color1 = (services[serviceId1] && services[serviceId1].color) ? services[serviceId1].color : '#fff';
    return [color, color1];
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {autos && autos.map(auto => (
          <TouchableOpacity key={auto.id}>
            <LinearGradient colors={getBackgroundGradient(auto.trigger_service_id, auto.reaction_service_id)} style={styles.card}>
              <View style={[styles.header]}>
                <Text style={styles.title}>Automation {auto.id}</Text>
              </View>
              <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.minServiceImgView}><Image
                  source={getImageSource(auto.trigger_service_id)}
                  style={styles.minServiceImg}
                />
                </View>
                <View style={{ flex: 1 }} />
                <View style={styles.minServiceImgView}><Image
                  source={getImageSource(auto.reaction_service_id)}
                  style={styles.minServiceImg}
                />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
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

  },
  card: {
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
    backgroundColor: '#fff',
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
    fontWeight: 'bold',
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
  }
});
