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
  Modal
} from 'react-native';

import {
  useNavigation, useTheme
} from '@react-navigation/native';

import { theme } from '../Components/Theme'
import Background from '../Components/Background'
import Logo from '../Components/Logo'
import TextInput from '../Components/TextInput'
import Button from '../Components/Button'

import { validateEmail, validatePassword } from '../Tests/Validators'

import { LoginEmailPass, GetUser } from '../Core/ServerCalls'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../Components/Icon';
import SettingsContext from '../Contexts/Settings';

function LoginScreen() {
  const { settings, setSettings } = useContext(SettingsContext);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const [email, setEmail] = useState({ value: 'test@gmail.com', error: '' })
  const [password, setPassword] = useState({ value: '12345678', error: '' })
  const [error, setError] = useState("")

  useEffect(() => {
  }, []);

  const onLoginPressed = async () => {
    const emailError = validateEmail(email.value)
    const passwordError = validatePassword(password.value)
    if (!emailError || !passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })

      return
    }
    try {
      const token = await LoginEmailPass(settings.apiLocation, email.value, password.value);
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
            label="API Location"
            returnKeyType="next"
            value={settings.apiLocation}
            onChangeText={(text) => setSettings({ ...settings, apiLocation: text })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="name"
            textContentType="name"
          />
          <Button mode="contained" onPress={() => { setModalVisible(false) }} title="Save">Save</Button>
        </View>
      </Modal>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Text style={styles.header}>Nice to see you again !</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View> */}
      <Button mode="contained" onPress={onLoginPressed} title="Login">
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don't have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button_log_with} onPress={() => console.log("github login")}>
        <Image source={require("../../assets/github_logo.png")} style={styles.logo} />
        <Text style={styles.text}>Login with GitHub</Text>
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

export default LoginScreen;
