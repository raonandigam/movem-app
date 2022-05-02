import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Button, Avatar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
//components
import InputComponent from '../Components/InputComponent';
import Spacer from '../Components/Spacer';
import SafeView from '../Components/SafeView';
// Dispatch
import {updateMessage} from '../../Redux/snackBarMessageSlice';
import {updateUserDetails} from '../../Redux/userSlice';
import {logIn} from '../../Redux/authSlice';
import {authRegister} from '../Services/loginService';

const RegisterScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setErrorMessage(null);
    Keyboard.dismiss();
    setIsLoading(true);

    if (!email || !name || !password) {
      setErrorMessage('Value Should not be empty');
      setIsLoading(false);
      return;
    }

    const result = await authRegister({
      name: name,
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
        message: `Successfully Registered & Logged-In`,
      }),
    );

    const responseResult = jwt_decode(result.body?.access_token);
    dispatch(
      updateUserDetails({
        userName: responseResult.name,
        userId: responseResult?.userId ?? responseResult.id,
      }),
    );
    dispatch(
      logIn({
        loggedIn: true,
        jwtToken: result.body?.access_token,
      }),
    );
  };

  return (
    <SafeView>
      <View style={{padding: 40}}>
        <View>
          <Avatar.Image
            size={100}
            source={require('../assets/image/movemIMG.jpg')}
            style={styles.avatarImage}
          />
        </View>
        <Spacer />
        <InputComponent
          textLabel={'Name *'}
          key={'name'}
          textValue={name}
          onChangeText={setName}
          errorMessage={errorMessage}
          helperVisible={errorMessage ?? false}
        />
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
        <Spacer />
        <Button
          icon="account-plus"
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          onPress={handleSignup}
          contentStyle={{
            flexDirection: 'row-reverse',
          }}>
          Sign Up
        </Button>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    backgroundColor: 'initial',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
