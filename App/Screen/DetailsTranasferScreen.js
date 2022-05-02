import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card} from 'react-native-paper';
// Components
import Spacer from '../Components/Spacer';
// Service
import {transfer} from '../Services/buyService';
// Dispatch
import {updateMessage} from '../../Redux/snackBarMessageSlice';
import {maskID} from '../Services/const';

const ConfirmTransferDetails = props => {
  const {params} = props.route;
  const {jwtToken} = useSelector(state => state.auth);
  const {wallet_address} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleTransferRequestConfirm = async () => {
    setisLoading(true);
    const response = await transfer(jwtToken, {
      usd_amount: params.amount,
      srcWallet: params.srcWallet,
      dstWallet: wallet_address,
    });

    if (response.status != 201) {
      dispatch(
        updateMessage({
          type: 'error',
          message: `Error (${response.status}) - ${response.body?.message}`,
        }),
      );
      setisLoading(false);
      return;
    }
    dispatch(
      updateMessage({
        type: 'success',
        message: `Request Submitted Successfully`,
      }),
    );
    setRequestSubmitted(true);
  };

  const TransferDetailsRender = () => {
    return (
      <View style={styles.detailsView}>
        {/* Loan Request Card Components */}
        <Card style={styles.cardView}>
          <Card.Title
            titleStyle={{flex: 1, alignSelf: 'center', color: 'green'}}
            title={'Transfer Details'}
          />
          <Card.Content style={{marginTop: 17}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Amount : </Text>
              <Text style={{fontSize: 17}}>$ {params.amount}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Source Wallet : </Text>
              <Text style={{fontSize: 17}}>{params.srcWallet} </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Dest Wallet : </Text>
              <Text style={{fontSize: 17}}>{maskID(params.dstWallet)} </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.viewStyle}>
      {requestSubmitted && (
        <View style={{alignSelf: 'center'}}>
          <Spacer />
          <Text style={styles.textStyles}>Request Submitted</Text>
        </View>
      )}

      <View style={styles.buttonStyle}>
        {/* Lend Info */}
        <TransferDetailsRender />
        <Spacer />
        {!requestSubmitted && (
          <Button
            mode="contained"
            disabled={isLoading}
            loading={isLoading}
            style={isConfirm ? styles.Cbutton : styles.homeButton}
            onPress={() => {
              if (!isConfirm) {
                setIsConfirm(true);
              } else {
                setIsConfirm(false);
                handleTransferRequestConfirm();
              }
            }}>
            {!isLoading && (isConfirm ? 'Click again to-CONFIRM' : 'Transfer')}
          </Button>
        )}
      </View>

      {/* Button after request Submitted */}
      {requestSubmitted && (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Button
            icon={'home'}
            mode="contained"
            style={styles.homeButton}
            onPress={() => props.navigation.navigate('Dashboard')}>
            Home
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  detailsView: {
    padding: 10,
    justifyContent: 'center',
  },
  cardView: {
    padding: 10,
    borderRadius: 25,
    elevation: 10,
  },
  textStyles: {
    alignContent: 'center',
    fontSize: 25,
  },
  buttonStyle: {
    marginTop: 40,
    borderRadius: 40,
    fontSize: 40,
  },
  header: {
    fontSize: 22,
  },
  title: {
    fontSize: 24,
  },
  Cbutton: {
    marginTop: '10%',
    elevation: 2,
    width: '70%',
    alignSelf: 'center',
    color: '#e8e8e8',
    backgroundColor: '#FF6E33',
  },
  textView: {
    fontSize: 17,
    fontWeight: '800',
  },
  homeButton: {
    marginTop: '10%',
    elevation: 8,
    width: '48%',
    alignSelf: 'center',
    borderRadius: 10,
  },
});
export default ConfirmTransferDetails;
