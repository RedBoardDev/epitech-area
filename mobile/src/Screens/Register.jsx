import React, {
  useContext,
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  Modal,
} from 'react-native';

import {
  useNavigation,
  useTheme
} from '@react-navigation/native';

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '@env';

import { authorize } from 'react-native-app-auth';

import { theme } from '../Components/Theme'
import Background from '../Components/Background'
import Logo from '../Components/Logo'
import TextInput from '../Components/TextInput'
import Button from '../Components/Button'
import { useSettings } from '../Contexts/Settings';

import { validateEmail, validatePassword } from '../Tests/Validators'

import { RegisterEmailPass, registerGithub } from '../Core/ServerCalls'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../Components/Icon';

function RegisterScreen() {
  const { settings, setSettings, t } = useSettings();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const [firstname, setFirstname] = useState({ value: 'test', error: '' })
  const [lastname, setLastname] = useState({ value: 'test', error: '' })
  const [email, setEmail] = useState({ value: 'test@thomasott.com', error: '' })
  const [password, setPassword] = useState({ value: 'test123/', error: '' })
  const [error, setError] = useState("")


  const onRegisterPressed = async () => {
    const emailError = validateEmail(email.value)
    const passwordError = validatePassword(password.value)
    if (!emailError || !passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    try {
      const token = await RegisterEmailPass(settings.apiBaseUrl, email.value, password.value, firstname.value, lastname.value);
      if (token.length > 10) {
        await AsyncStorage.setItem('jwtToken', token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'NavBar' }],
        });
      } else {
        setError("Unknown error, please try again.")
      }
    } catch (err) {
      setError(err.message)
      setEmail({ ...email, error: true })
    }
  }

  const handleRegisterGithub = async () => {
    try {
      const config = {
        redirectUrl: 'com.area://oauthredirect',
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        scopes: ['user', 'repo'],
        additionalHeaders: { 'Accept': 'application/json' },
        serviceConfiguration: {
          authorizationEndpoint: 'https://github.com/login/oauth/authorize',
          tokenEndpoint: 'https://github.com/login/oauth/access_token',
          revocationEndpoint: 'https://github.com/settings/connections/applications/' + GITHUB_CLIENT_ID
        }
      };
      const authState = await authorize(config);

      const token = await registerGithub(settings.apiBaseUrl, authState.accessToken);
      if (token.length > 10) {
        await AsyncStorage.setItem('jwtToken', token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'NavBar' }],
        });
      } else {
        setError("Unknown error, please try again. ")
      }
    } catch (err) {
      setError(err.message)
      setEmail({ ...email, error: true })
    }
  }

  return (
    <Background>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false) }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <TextInput
            label={t("API Location")}
            returnKeyType="next"
            value={settings.apiLocation}
            onChangeText={(text) => setSettings({ ...settings, apiLocation: text })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
          />
          <Button mode="contained" onPress={() => { setModalVisible(false) }}>{t("Save")}</Button>
        </View>
      </Modal>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Text style={styles.header}>{t("Welcome to HarmonieWeb")}</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <TextInput
        label={t("First Name")}
        returnKeyType="next"
        value={firstname.value}
        onChangeText={(text) => setFirstname({ value: text, error: '' }) & setError('')}
        error={!!firstname.error}
        errorText={firstname.error}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
      />
      <TextInput
        label={t("Last Name")}
        returnKeyType="next"
        value={lastname.value}
        onChangeText={(text) => setLastname({ value: text, error: '' }) & setError('')}
        error={!!lastname.error}
        errorText={lastname.error}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
      />
      <TextInput
        label={t("Email")}
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' }) & setError('')}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label={t("Password")}
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onRegisterPressed}>{t("Register")}</Button>
      <View style={styles.row}>
        <Text>{t("Already have an account ? ")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>{t("Login")}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button_log_with} onPress={handleRegisterGithub}>
        <Image source={require("../../assets/github_logo.png")} style={styles.logo} />
        <Text style={styles.text}>{t("Register with GitHub")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settings} onPress={() => setModalVisible(true)}>
        <Icon name="settings.png" size={24} color={'black'} />
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  button_log_with: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  text: {
    color: '#000',
    marginLeft: 10,
  },
  logo: {
    width: 20,
    height: 20,
  },
  settings: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default RegisterScreen;
