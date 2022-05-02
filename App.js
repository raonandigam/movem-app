import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './App/Screen/HomeScreen';
import DashBoardScreen from './App/Screen/DashboardScreen';
import RegisterScreen from './App/Screen/RegisterScreen';
import Login from './App/Screen/Login';
import LendScreen from './App/Screen/LendScreen';
import BorrowScreen from './App/Screen/BorrowScreen';
import PledgeScreen from './App/Screen/PledgeScreen';
import MyAccountScreen from './App/Screen/MyAccountScreen';
import WalletScreen from './App/Screen/WalletScreen';
import LendDetailsScreen from './App/Screen/LendDetailsScreen';
import AllRequest from './App/Screen/AllRequestScreen';
import PledgeScreenDetails from './App/Screen/PledgeScreenDetails';
import BorrowRequest from './App/Screen/BorrowRequestScreen';
import StatusScreen from './App/Screen/StatusScreen';
import QuizScreen from './App/Screen/CreditQuizScreen';
import ConfirmBorrowDetails from './App/Screen/DetailsBorrowScreen';
import SnackBarComponent from './App/Components/SnackBarComponent';
import AppBarComponent from './App/Components/AppBarComponent';
import PledgeScreenInfo from './App/Screen/PledgeScreenInfo';
import BuyUSDCScreen from './App/Screen/BuyUSDCScreen';
import ConfirmBuyDetails from './App/Screen/DetailsBuyScreen';
import TransferUSDCScreen from './App/Screen/TransferUSDCScreen';
import ConfirmTransferDetails from './App/Screen/DetailsTranasferScreen';
import ConvertNUSDtoINR from './App/Screen/ConvertNUSDtoINR';
import DetailsConvertScreen from './App/Screen/DetailsConvertScreen';
import VerifyKYC from "./App/Screen/VerifyKyc";
import {LogBox} from 'react-native';

const Stack = createNativeStackNavigator();
const App = () => {
  const {loggedIn, skipIntro} = useSelector(state => state.auth);

  LogBox.ignoreLogs(['EventEmitter.removeListener']);

  return (
    <>
      <NavigationContainer>
        {loggedIn && (
          <Stack.Navigator
            screenOptions={{
              header: props => <AppBarComponent {...props} />,
            }}>
            <Stack.Screen name="Dashboard" component={DashBoardScreen} />
            <Stack.Screen name="Lend" component={LendScreen} />
            <Stack.Screen name="Lend Details" component={LendDetailsScreen} />
            <Stack.Screen name="All Request" component={AllRequest} />
            <Stack.Screen name="Status Request" component={StatusScreen} />
            <Stack.Screen name="Borrow" component={BorrowScreen} />
            <Stack.Screen name="Pledge" component={PledgeScreen} />
            <Stack.Screen name="Pledge Info" component={PledgeScreenInfo} />
            <Stack.Screen name="BuyUSDC" component={BuyUSDCScreen} />
            <Stack.Screen name="TransferUSDC" component={TransferUSDCScreen} />
            <Stack.Screen
              name="Convert NUSD to INR"
              component={ConvertNUSDtoINR}
            />
            <Stack.Screen
              name="PledgeDetails"
              component={PledgeScreenDetails}
            />
            <Stack.Screen name="Quiz Screen" component={QuizScreen} />
            <Stack.Screen
              name="Borrow  Details Confirm"
              component={ConfirmBorrowDetails}
            />
            <Stack.Screen
              name="Buy  Details Confirm"
              component={ConfirmBuyDetails}
            />
            <Stack.Screen
              name="Transfer  Details Confirm"
              component={ConfirmTransferDetails}
            />
            <Stack.Screen
              name="Convert Details Confirm"
              component={DetailsConvertScreen}
            />
            <Stack.Screen name="Borrow Request" component={BorrowRequest} />
            <Stack.Screen name="Account" component={MyAccountScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="VerifyKYC" component={VerifyKYC} />
          </Stack.Navigator>
        )}
        {!loggedIn && skipIntro && (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
        {!loggedIn && !skipIntro && (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>

      <SnackBarComponent />
    </>
  );
};

export default App;
