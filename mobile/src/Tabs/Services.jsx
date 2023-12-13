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
  useNavigation,
  useTheme
} from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getImgByServiceId, getServices, getServiceToken } from '../Core/ServerCalls'

import LinearGradient from 'react-native-linear-gradient';
import SettingsContext from "../Contexts/Settings";

const defaultImage = require("../../assets/logo.png");

export default function Services() {
  const { colors } = useTheme();
  const [imageUrls, setImageUrls] = useState({});
  const [services, setServices] = useState({ k: {} });
  const [tokens, setTokens] = useState({ k: "" });
  const { settings } = useContext(SettingsContext);


  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices(settings.apiLocation, await AsyncStorage.getItem('jwtToken'));
      setServices(data);
    };

    fetchServices();

  }, []);

  useEffect(() => {

    const fetchImages = async () => {
      if (Array.isArray(services)) {
        let newImageUrls = {};
        for (let serv of services) {
          try {
            const imageUrl = await getServiceIcon(serv.id);
            newImageUrls[serv.id] = imageUrl;
          } catch (error) {
            console.error('Error fetching image:', error);
            newImageUrls[serv.id] = null;
          }
        }
        setImageUrls(newImageUrls);
      }
    };

    const fetchTokens = async () => {
      if (Array.isArray(services)) {
        let newTokens = {};
        for (let service of services) {
          try {
            const token = await getServiceToken(settings.apiLocation, service.id);
            newTokens[service.id] = token;
          } catch (error) {
            console.error('Error fetching service:', error);
            newTokens[auto.trigger_service_id] = null;
          }
        }
        setTokens(newTokens);
      }
    };

    fetchTokens();
    fetchImages();
  }, [services]);

  const handleLogoutPress = () => {
    navigateToLogin();
  };

  const getServiceIcon = async (serviceId) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const response = await getImgByServiceId(settings.apiLocation, token, serviceId);
    return response;
  }

  const getImageSource = (imageId) => {
    if (imageUrls && imageUrls[imageId]) {
      return { uri: imageUrls[imageId] };
    } else {
      return defaultImage;
    }
  };

  const getBackgroundGradient = (serviceColor) => {
    const color = "#fff";
    const color1 = (serviceColor ? serviceColor : '#fff');
    return [color, color1];
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Array.isArray(services) && services.map(service => (
          <TouchableOpacity key={service.id}>
            <LinearGradient useAngle={true} angle={170} colors={getBackgroundGradient(service.color)} style={styles.card}>
              <Text style={styles.title}>{service.name}</Text>
              <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, marginTop: 15 }}>
                  <View style={styles.header}>
                    <Text style={styles.content}>{service.description}</Text>
                  </View>
                </View>
                <View style={styles.minServiceImgView}><Image
                  source={getImageSource(service.id)}
                  style={styles.minServiceImg}
                />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    padding: 3,
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
  }
});
