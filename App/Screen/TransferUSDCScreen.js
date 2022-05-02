import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {Card, Button, Divider} from 'react-native-paper';
//Component
import InputComponent from '../Components/InputComponent';
import SafeView from '../Components/SafeView';
// Services
import {getUserCircleWalletBalance} from '../Services/accountService';
// Dispatch
import {updateMessage} from '../../Redux/snackBarMessageSlice';
// Utils
import {maskID} from '../Services/const';

const TransferUSDCScreen = props => {
  const dispatch = useDispatch();
  const {jwtToken} = useSelector(state => state.auth);
  const {circle_wallet, wallet_address} = useSelector(state => state.user);

  const [amount, setAmount] = useState(null);
  const [srcWallet, setSrcWallet] = useState(null);
  const [dstWallet, setDestWallet] = useState(null);
  const [circleMaxAmount, setCircleMaxAmount] = useState(0);

  useEffect(() => {
    const fetchUserCircleBalance = async () => {
      const response = await getUserCircleWalletBalance(
        jwtToken,
        circle_wallet,
      );
      if (response.status === 200) {
        setCircleMaxAmount(response.body.amount);
      }
      setSrcWallet(String(circle_wallet));
      setDestWallet(maskID(wallet_address));
    };
    fetchUserCircleBalance();
    return () => {
      setAmount(null);
    };
  }, []);

  const handleBuyRequest = () => {
    if (!amount || !srcWallet || !dstWallet) {
      dispatch(
        updateMessage({
          type: 'error',
          message: 'Kindly fill all the input fields',
        }),
      );
      return;
    }
    props.navigation.navigate('Transfer  Details Confirm', {
      amount,
      srcWallet,
      dstWallet,
    });
  };

  return (
    <SafeView>
      <View style={styles.viewStyle}>
        <Card style={styles.cardstyle}>
          <Text style={styles.headerStyle} h4>
            Transfer Info
          </Text>
          <Divider style={{height: 2, marginTop: 3, marginBottom: 6}} />
          <View style={styles.inputview}>
            <InputComponent
              style={styles.inputtext}
              textLabel="Amount ($)"
              value={amount}
              onChangeText={newAmount => {
                if (Number(newAmount) <= Number(circleMaxAmount)) {
                  setAmount(newAmount);
                }
                return;
              }}
              disabled={!circleMaxAmount}
              renderKeyboardType="decimal-pad"
              placeholder="Amount"
              returnKeyType={'done'}
              helperVisible={true}
              errorMessage={`Balance : ${circleMaxAmount}`}
            />
            <View style={{marginTop: 5}}></View>
            <InputComponent
              style={styles.inputtext}
              textLabel="Source Wallet "
              value={srcWallet}
              onChangeText={newSrcWallet => setSrcWallet(newSrcWallet)}
              // renderKeyboardType="decimal-pad"
              placeholder="Dest Wallet"
              returnKeyType={'done'}
            />
            <InputComponent
              style={styles.inputtext}
              textLabel="Destination Wallet "
              value={dstWallet}
              onChangeText={newDstWallet => setDestWallet(newDstWallet)}
              // renderKeyboardType="decimal-pad"
              placeholder="Dest Wallet"
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

export default TransferUSDCScreen;
