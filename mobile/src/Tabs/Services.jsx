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
} from "react-native";

import {
  useNavigation,
  useTheme
} from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getImgByServiceId, getServices, getServiceToken, updateServiceToken } from '../Core/ServerCalls'

import LinearGradient from 'react-native-linear-gradient';
import SettingsContext from "../Contexts/Settings";

const defaultImage = require("../../assets/logo.png");

export default function Services() {
  const { colors } = useTheme();
  const [imageUrls, setImageUrls] = useState({});
  const [services, setServices] = useState({ k: {} });
  const [tokens, setTokens] = useState({ k: "" });
  const { settings } = useContext(SettingsContext);

  const fetchServices = async () => {
    const data = await getServices(settings.apiLocation);
    setServices(data);
  };

  useEffect(() => {
    fetchServices();

  }, []);

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

  useEffect(() => {

    const fetchImages = async () => {
      if (Array.isArray(services)) {
        let newImageUrls = {};
        for (let serv of services) {
          try {
            const imageUrl = await getImgByServiceId(settings.apiLocation, serv.id);
            newImageUrls[serv.id] = imageUrl;
          } catch (error) {
            console.error('Error fetching image:', error);
            newImageUrls[serv.id] = null;
          }
        }
        setImageUrls(newImageUrls);
      }
    };

    fetchTokens();
    fetchImages();
  }, [services]);

  const handleLogoutPress = () => {
    navigateToLogin();
  };

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

  const getSConnected = (serviceId) => {
    if (tokens && tokens[serviceId] && tokens[serviceId].length > 1) {
      return true;
    } else {
      return false;
    }
  }

  const rmService = async (id) => {
    updateServiceToken(settings.apiLocation, id, "/");
    fetchServices();
  }

  const removeService = async (id, name) => {
    Alert.alert('Disconnect', `Are you sure you want to disconnect ${name} ?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => rmService(id)},
    ]);
    fetchServices();
  };

  const addService = async (id) => {
    updateServiceToken(settings.apiLocation, id, "ttttttttttt");
    fetchServices();

  };

  return (
    <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
      imageStyle={{ opacity: 0.3 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ flexDirection: "columns" }}>
          {Array.isArray(services) && services.map(service => (
            <View key={service.id} style={{ flexDirection: "row" }}>
              <TouchableOpacity style={{ flex: 1 }}>
                <LinearGradient useAngle={true} angle={170} colors={getBackgroundGradient(service.color)} style={styles.card}>
                  <Text style={styles.title}>{service.name}</Text>
                  <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, marginTop: 15 }}>
                      <View style={styles.header}>
                        <Text style={styles.content}>{service.description}</Text>
                      </View>
                      {getSConnected(service.id) ?
                        <LinearGradient key={service.id} useAngle={true} angle={170} colors={["#fff", "#76EC8B"]} style={styles.header}>
                          <Text style={{}}>Connected</Text>
                        </LinearGradient> :
                        <LinearGradient key={service.id} useAngle={true} angle={170} colors={["#fff", "#F16A37"]} style={styles.header}>
                          <Text style={{}}>Not Connected</Text>
                        </LinearGradient>}
                    </View>
                    <View style={styles.minServiceImgView}><Image
                      source={getImageSource(service.id)}
                      style={styles.minServiceImg}
                    />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              {getSConnected(service.id) ?
              <TouchableOpacity key={service.id} style={styles.disconnectBtn} onPress={() => removeService(service.id, service.name)}>
                <Image source={require("../../assets/disconnect.png")} style={{ width: 40, height: 40}} />
              </TouchableOpacity> :
              <TouchableOpacity key={service.id} style={styles.connectBtn} onPress={() => addService(service.id)}>
                <Image source={require("../../assets/login.png")} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
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
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: "#000",
  },
  disconnectBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e01f40',
    width: 50,
    borderRadius: 10,
    margin: 10,
    marginLeft: 0,
  },
  connectBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#62D141',
    width: 50,
    borderRadius: 10,
    margin: 10,
    marginLeft: 0,
  },
});
