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
import DropDown from "react-native-paper-dropdown";

const BorrowScreen = props => {
  const dispatch = useDispatch();
  const {jwtToken} = useSelector(state => state.auth);

  const [amount, setAmount] = useState(null);
  const [rate, setRate] = useState(null);
  const [tenor, setTenor] = useState(null);
  const [collateral, setCollateral] = useState('');
  const [collaterals, setCollaterals] = useState([]);
  const [showDropDown, setShowDropDown] = useState([]);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      const response = await getWalletToken(jwtToken);
      if (response.status === 200) {
        const tokensAvailable = response.body;
        setCollaterals(
          tokensAvailable.map(t => {
            return {label: t.token_code, value: t.token_code};
          }),
        );
        if (tokensAvailable.length > 0) {
          setCollateral(tokensAvailable[0].token_code);
        }
      }
    };
    fetchTokenDetails();
  }, []);

  const handleBorrowRequest = () => {
    if (!amount || !rate || !tenor) {
      dispatch(
        updateMessage({
          type: 'error',
          message: 'Kindly fill all the input fields',
        }),
      );
      return;
    }
    props.navigation.navigate('Borrow  Details Confirm', {
      amount,
      rate,
      tenor,
      collateral,
    });
  };

  return (
    <SafeView>
      <View style={styles.viewStyle}>
        <Card style={styles.cardstyle}>
          <Text style={styles.headerStyle} h4>
            Borrow Info
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
              textLabel="Rate (%)"
              value={rate}
              onChangeText={newRate => setRate(newRate)}
              renderKeyboardType="decimal-pad"
              placeholder="Rate"
              returnKeyType={'done'}
            />
            <InputComponent
              style={styles.inputtext}
              textLabel="Tenor (months)"
              value={tenor}
              onChangeText={newTenor => setTenor(newTenor)}
              renderKeyboardType="decimal-pad"
              placeholder="Tenor"
              returnKeyType={'done'}
            />
            {/* <InputComponent
              style={styles.inputtext}
              textLabel="Collateral"
              value={collateral}
              onChangeText={newCollateral => setCollateral(newCollateral)}
              placeholder="Collateral"
              disabled={true}
            /> */}
            <DropDown
              label="Collateral (Token)"
              mode="outlined"
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={collateral}
              setValue={setCollateral}
              list={collaterals}
            />
          </View>

          <Button
            onPress={handleBorrowRequest}
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

export default BorrowScreen;
