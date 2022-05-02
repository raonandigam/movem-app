import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {Card, Button, Divider} from 'react-native-paper';
//Component
import InputComponent from '../Components/InputComponent';
import SafeView from '../Components/SafeView';
// Dispatch
import {updateMessage} from '../../Redux/snackBarMessageSlice';
import {getWalletToken} from '../Services/accountService';

const BuyUSDCScreen = props => {
  const dispatch = useDispatch();
  const {jwtToken} = useSelector(state => state.auth);
  const {circle_wallet} = useSelector(state => state.user);

  const [amount, setAmount] = useState(null);
  const [dstWallet, setDestWallet] = useState(null);
  const [cardUserName, setCardUserName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvvNumber, setCvvNumber] = useState('');

  useEffect(() => {
    const fetchTokenDetails = async () => {
      const response = await getWalletToken(jwtToken);
      if (response.status === 200) {
        setDestWallet(String(circle_wallet));
      }
    };
    fetchTokenDetails();
  }, []);
  // const [tenor, setTenor] = useState(null);
  // const [collateral, setCollateral] = useState('');
  // const [collaterals, setCollaterals] = useState([]);
  // const [showDropDown, setShowDropDown] = useState([]);

  // useEffect(() => {
  //   const fetchTokenDetails = async () => {
  //     const response = await getWalletToken(jwtToken);
  //     if (response.status === 200) {
  //       const tokensAvailable = response.body;
  //       setCollaterals(
  //         tokensAvailable.map(t => {
  //           return {label: t.token_code, value: t.token_code};
  //         }),
  //       );
  //       if (tokensAvailable.length > 0) {
  //         setCollateral(tokensAvailable[0].token_code);
  //       }
  //     }
  //   };
  //   fetchTokenDetails();
  // }, []);

  const handleBuyRequest = () => {
    if (!amount || !dstWallet) {
      dispatch(
        updateMessage({
          type: 'error',
          message: 'Kindly fill all the input fields',
        }),
      );
      return;
    }
    props.navigation.navigate('Buy  Details Confirm', {
      amount,
      dstWallet,
    });
  };

  return (
    <SafeView>
      <View style={styles.viewStyle}>
        <Card style={styles.cardstyle}>
          <Text style={styles.headerStyle} h4>
            Buy Info
          </Text>
          <Divider style={{height: 2, marginTop: 3, marginBottom: 6}} />
          <View style={styles.inputview}>
            <InputComponent
              style={styles.inputtext}
              textLabel="Amount ($)"
              value={amount}
              onChangeText={newAmount => setAmount(newAmount)}
              renderKeyboardType="decimal-pad"
              placeholder="Amount"
              returnKeyType={'done'}
            />
            <View style={{marginTop: 5}}></View>
            <InputComponent
              style={styles.inputtext}
              textLabel="Destination Wallet "
              value={dstWallet}
              onChangeText={newDstWallet => setDestWallet(newDstWallet)}
              // renderKeyboardType="decimal-pad"
              placeholder="Dest Wallet"
              returnKeyType={'done'}
            />
            <View style={{marginTop: 5}}></View>
            <InputComponent
              style={styles.inputtext}
              textLabel="Name on Card"
              value={cardUserName}
              onChangeText={name => setCardUserName(name)}
              placeholder="Name on Card"
              returnKeyType={'done'}
            />
            <View style={{marginTop: 5}}></View>
            <InputComponent
              style={styles.inputtext}
              textLabel="Card Number"
              value={cardNumber}
              onChangeText={cardNumber => setCardNumber(cardNumber)}
              renderKeyboardType="decimal-pad"
              placeholder="Card Number"
              returnKeyType={'done'}
            />
            <View style={{marginTop: 5}}></View>
            <InputComponent
              style={styles.inputtext}
              textLabel="CVV"
              value={cvvNumber}
              onChangeText={cvvNumber => setCvvNumber(cvvNumber)}
              renderKeyboardType="decimal-pad"
              placeholder="CVV"
              returnKeyType={'done'}
            />
          </View>

          <Button
            onPress={handleBuyRequest}
            mode="contained"
            style={styles.buttonStyle}>
            Request
          </Button>
        </Card>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  cardstyle: {
    margin: 30,
    borderRadius: 20,
    elevation: 10,
    marginTop: 15,
  },

  headerStyle: {
    marginLeft: 100,
    color: '#138D75',
    fontSize: 25,
    marginTop: 15,
  },

  textStyles: {
    alignContent: 'center',
    fontSize: 25,
  },
  buttonStyle: {
    elevation: 8,
    width: '48%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: '4%',
  },
  inputtext: {
    fontSize: 17,
    borderRadius: 25,
  },
  inputview: {
    justifyContent: 'center',
    width: '60%',
    marginLeft: 65,
    marginTop: 10,
    paddingBottom: 20,
  },
});

export default BuyUSDCScreen;
