import React, {useState} from 'react';
import {StyleSheet, View, Keyboard, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
// Components
import SafeView from '../Components/SafeView';
import InputComponent from '../Components/InputComponent';
import Spacer from '../Components/Spacer';
// Services
import {authLogin} from '../Services/loginService';
// Dispatch
import {logIn} from '../../Redux/authSlice';
import {updateMessage} from '../../Redux/snackBarMessageSlice';
import {updateUserDetails} from '../../Redux/userSlice';

const Login = props => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMessage(null);
    Keyboard.dismiss();
    setIsLoading(true);
    if (!email || !password) {
      setErrorMessage('Value should not be empty');
      setIsLoading(false);
      return;
    }
    const result = await authLogin({
      email: email,
      password: password,
    });
    if (result.status !== 201) {
      dispatch(
        updateMessage({
          type: 'error',
          message: `${result.status} - ${result.body.message}`,
        }),
      );
      setIsLoading(false);
      return;
    }
    dispatch(
      updateMessage({
        type: 'success',
        message: `Successfully Logged-In`,
      }),
    );
    console.log("*********", result);
    const {name, userId, wallet_address, circle_wallet} = jwt_decode(
      result.body?.access_token,
    );
    dispatch(
      updateUserDetails({
        userName: name,
        userId,
        wallet_address,
        circle_wallet,
      }),
    );
    dispatch(
      logIn({
        loggedIn: true,
        jwtToken: result.body?.access_token,
        isKycVerified: false
      }),
    );
  };

  return (
    <SafeView>
      <View style={{padding: 50}}>
        <View style={styles.avatarContainer}>
        <Image
        style={styles.avatarImage}
        source={require('../assets/image/movemLogo.png')}
      />
        </View>
        <Spacer />
        <InputComponent
          textLabel={'Email *'}
          key={'email'}
          textValue={email}
          onChangeText={setEmail}
          renderKeyboardType="email-address"
          errorMessage={errorMessage}
          helperVisible={errorMessage ?? false}
        />
        <InputComponent
          textLabel={'Password *'}
          key={'password'}
          textValue={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          errorMessage={errorMessage}
          helperVisible={errorMessage ?? false}
        />
        <Spacer />
        <Button
          icon="login"
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          onPress={handleLogin}
          contentStyle={{
            flexDirection: 'row-reverse',
          }}>
          {!isLoading && `Login`}
        </Button>
        <Spacer />
        <Button
          icon="account-plus"
          mode="contained"
          disabled={isLoading}
          onPress={() => props.navigation.navigate('Register')}
          contentStyle={{
            flexDirection: 'row-reverse',
            backgroundColor: '#FF9F45',
          }}>
          Register
        </Button>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    width: 70,
    height: 80,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Login;
