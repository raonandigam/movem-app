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

const ConvertNUSDtoINR = props => {
  const dispatch = useDispatch();
  const {jwtToken} = useSelector(state => state.auth);

  const [amount, setAmount] = useState(null);
  const [walletMaxAmount, setWalletMaxAmount] = useState(0);

  useEffect(() => {
    const fetchUserCircleBalance = async () => {
      const response = await getWalletToken(jwtToken);
      if (response.status === 200) {
        response.body.forEach(element => {
          if (element.token_code === 'NUSD') {
            setWalletMaxAmount(element.balance ?? 0);
          }
        });
      }
    };
    fetchUserCircleBalance();
    return () => {
      setAmount(null);
    };
  }, []);

  const handleBuyRequest = () => {
    if (!amount) {
      dispatch(
        updateMessage({
          type: 'error',
          message: 'Kindly fill all the input fields',
        }),
      );
      return;
    }
    props.navigation.navigate('Convert Details Confirm', {
      amount,
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
                if (Number(newAmount) <= Number(walletMaxAmount)) {
                  setAmount(newAmount);
                }
                return;
              }}
              disabled={!walletMaxAmount}
              renderKeyboardType="decimal-pad"
              placeholder="Amount"
              returnKeyType={'done'}
              helperVisible={true}
              errorMessage={`Balance : ${walletMaxAmount}`}
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

export default ConvertNUSDtoINR;
