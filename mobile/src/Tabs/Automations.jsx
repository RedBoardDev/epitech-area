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
  const { settings } = useSettings();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [autos, setAutos] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [services, setServices] = useState({ k: {} });
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);

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
    removeAuto(settings.apiBaseUrl, id);
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

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const data = await getAutos(settings.apiBaseUrl);
    setAutos(data);
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flexDirection: "columns" }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {autos && autos.map(auto => (
          <View key={auto.id} style={{ flexDirection: "row" }}>
            <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]}>
              {/* <LinearGradient useAngle={true} angle={90} colors={getBackgroundGradient(auto.trigger_service_id, auto.reaction_service_id)} style={styles.card}> */}
              <View style={[styles.header]}>
                <Text style={styles.title}>{auto.automation_name}</Text>
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
              {/* </LinearGradient> */}
            </TouchableOpacity>
            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity style={[styles.sideButton, {backgroundColor: "#e01f40"}]} onPress={() => removeAutomation(auto.id)}>
                <Image source={require("../../assets/trash.png")} style={{ width: 30, height: 40, tintColor: "white" }} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.sideButton, {backgroundColor: "#f5c518"}]} onPress={() => 0}>
                <Image source={require("../../assets/star.png")} style={{ width: 40, height: 40, tintColor: "white" }} />
              </TouchableOpacity>
            </View>
          </View>
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
    width: '100%',

  },
  card: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    // borderColor: '#fff',
    // borderWidth: 1,
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
});
