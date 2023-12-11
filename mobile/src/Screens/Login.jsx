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
} from 'react-native';

import {
  useNavigation
} from '@react-navigation/native';

import { theme } from '../Components/Theme'
import Background from '../Components/Background'
import Logo from '../Components/Logo'
import TextInput from '../Components/TextInput'
import Button from '../Components/Button'

function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState({ value: 'test@gmail.com', error: '' })
  const [password, setPassword] = useState({ value: '12345678', error: '' })

  const onLoginPressed = () => {
    // const emailError = emailValidator(email.value)
    // const passwordError = passwordValidator(password.value)
    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError })
    //   setPassword({ ...password, error: passwordError })
    //   return
    // }

    console.log("Login")
  }
  return (
<Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Text style={styles.header}>Nice to see you again !</Text>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed} title="Login">
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
})

export default LoginScreen;
