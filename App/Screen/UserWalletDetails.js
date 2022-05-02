import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  Card,
  Chip,
  List,
  Text,
  Title,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
// Services
import {
  getUserCircleWalletBalance,
  getWalletToken,
} from '../Services/accountService';
// Dispatch
import {updateMessage} from '../../Redux/snackBarMessageSlice';
// Utils
import {maskID} from '../Services/const';

function UserWalletDetails() {
  const {jwtToken} = useSelector(state => state.auth);
  const {wallet_address, circle_wallet} = useSelector(state => state.user);
  const [tokenDetails, setTokenDetails] = useState(null);
  const [userCircleWalletBalance, setUserCircleWalletBalance] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTokenDetails = async () => {
      const response = await getWalletToken(jwtToken);
      if (response.status === 200) {
        setTokenDetails(response.body);
      }

      const circleWalletBalance = await getUserCircleWalletBalance(
        jwtToken,
        circle_wallet,
      );
      if (circleWalletBalance.status === 200) {
        setUserCircleWalletBalance(circleWalletBalance.body);
      }
    };
    fetchTokenDetails();
  }, []);

  const handleCopyClipboard = data => {
    Clipboard.setString(String(data));
    dispatch(
      updateMessage({
        type: 'success',
        message: `Copied to Clipboard`,
      }),
    );
  };

  return (
    <>
      {/* Newrl Wallet Card */}
      <Card style={styles.MainCard}>
        <Card.Content style={styles.CardDetails}>
          <Title>Newrl Wallet Details</Title>
        </Card.Content>
        <List.Section title="Wallet ID">
          <List.Item
            title={
              <Text
                style={{
                  textDecorationLine: 'underline',
                  textDecorationColor: '#6200ee',
                  textDecorationStyle: 'solid',
                }}
                onPress={() => handleCopyClipboard(wallet_address)}>
                {wallet_address}
              </Text>
            }
            titleNumberOfLines={2}
          />
        </List.Section>
        {!tokenDetails && (
          <ActivityIndicator animating={true} style={{padding: 10}} />
        )}
        {tokenDetails && tokenDetails.length === 0 && (
          <Text style={styles.emptyTokenText}>No Tokens Avaliable !</Text>
        )}
        {tokenDetails && tokenDetails.length > 0 && (
          <List.Section title="Token Details">
            {tokenDetails.map((token, index) => (
              <List.Item
                key={index}
                left={() => <Text>{token.token_code}</Text>}
                right={() => <Text>Balance : {token.balance}</Text>}
              />
            ))}
          </List.Section>
        )}
      </Card>

      {/* Circle Wallet Card */}
      <Card style={styles.MainCard}>
        <Card.Content style={styles.CardDetails}>
          <Title>USDC Wallet Details</Title>
        </Card.Content>
        <List.Section title="Wallet ID">
          <List.Item
            title={
              <Text
                style={{
                  textDecorationLine: 'underline',
                  textDecorationColor: '#6200ee',
                  textDecorationStyle: 'solid',
                }}
                onPress={() => handleCopyClipboard(circle_wallet)}>
                {circle_wallet}
              </Text>
            }
            titleNumberOfLines={2}
            right={props =>
              userCircleWalletBalance ? (
                <Chip icon="currency-usd">
                  {userCircleWalletBalance.amount}
                </Chip>
              ) : (
                <ActivityIndicator />
              )
            }
          />
        </List.Section>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  MainCard: {
    borderRadius: 10,
    padding: 5,
    margin: 10,
    elevation: 10,
  },
  CardDetails: {
    display: 'flex',
    alignItems: 'center',
  },
  balanceTextStyle: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  emptyTokenText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default UserWalletDetails;
