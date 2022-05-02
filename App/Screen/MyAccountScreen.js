import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {Divider, List, Button} from 'react-native-paper';
// Components
import SkeletonLoader from '../Components/SkeletonLoader';
import UserWalletDetails from './UserWalletDetails';
// Services
import {
  createWallet,
  getUserDetails,
  getUserLoans,
} from '../Services/accountService';
import {maskID} from '../Services/const';
// Dispatch
import {updateUserDetails} from '../../Redux/userSlice';
import {updateMessage} from '../../Redux/snackBarMessageSlice';

const MyAccountScreen = props => {
  const {jwtToken} = useSelector(state => state.auth);
  const {userId, userName} = useSelector(state => state.user);
  const [wallet_address, setWalletAddress] = useState();
  const dispatch = useDispatch();

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openedDropDown, setOpenedDropDown] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const response = await getUserLoans(jwtToken);
      if (response.status === 200) {
        setDetails(response.body);
      }

      const userDetails = await getUserDetails(jwtToken);
      if (userDetails.status === 200) {
        setWalletAddress(userDetails.body.wallet_address);
      }
    };
    fetchAccountDetails();
  }, []);

  const verifyKYC = () => {
    props.navigation.navigate('VerifyKYC');
  }

  const handleWalletCreate = async () => {
    setIsLoading(true);
    const response = await createWallet(jwtToken);
    if (response.status === 201) {
      dispatch(
        updateUserDetails({
          userId,
          userName,
          wallet_address: response.body.address,
          circle_wallet: response.body.circle_wallet,
        }),
      );
      setWalletAddress(response.body.address);
      dispatch(
        updateMessage({
          type: 'success',
          message: `Successfully Created Wallet`,
        }),
      );
      setIsLoading(false);
      return;
    }
    dispatch(
      updateMessage({
        type: 'error',
        message: `${response.status} - ${response.body.message}`,
      }),
    );
    setIsLoading(false);
  };

  if (!details) {
    return <SkeletonLoader />;
  }

  return (
    <ScrollView>
      <View>
        {wallet_address && <UserWalletDetails />}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: wallet_address ? 'center' : 'space-between',
            padding: 10,
          }}>
          {!wallet_address && (
            <Button
              mode="contained"
              loading={isLoading}
              disabled={isLoading}
              style={styles.buttonStyle}
              onPress={handleWalletCreate}>
              {isLoading ? 'Creating' : 'Create Wallet'}
            </Button>
          )}
          {/* <Button
            mode="contained"
            style={styles.buttonStyle}
            disabled={isLoading}
            onPress={() => props.navigation.navigate('Quiz Screen')}>
            Take Credit Quiz
          </Button> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: wallet_address ? 'center' : 'space-between',
            padding: 10,
          }}>
          <Button
            mode="contained"
            style={styles.buttonStyle}
            disabled={isLoading}
            onPress={verifyKYC}>
            Verify KYC
          </Button>
        </View>
        {details.length === 0 && (
          <View style={styles.container}>
            <Image
              source={require('../assets/image/empty.png')}
              style={styles.emptyImg}
            />
            <Text style={styles.baseText}>No Loans</Text>
          </View>
        )}
        {details.length > 0 && (
          <ScrollView>
            <List.Section title="Loans">
              {details.map((loanDetails, index) => {
                return (
                  <View key={index}>
                    <List.Accordion
                      title={maskID(loanDetails._id)}
                      left={_ => (
                        <List.Icon
                          color={loanDetails.is_pending ? '#F51818' : '#3D7804'}
                          icon={
                            loanDetails.is_pending
                              ? 'alpha-p-circle'
                              : 'alpha-s-circle'
                          }
                        />
                      )}
                      expanded={
                        openedDropDown === loanDetails._id ? true : false
                      }
                      onPress={() => {
                        if (openedDropDown === loanDetails._id) {
                          setOpenedDropDown(null);
                        } else {
                          setOpenedDropDown(loanDetails._id);
                        }
                      }}>
                      <List.Item title={`ID : ${loanDetails._id}`} />
                      <List.Item
                        title={`Is Pending : ${loanDetails.is_pending}`}
                        titleStyle={{textTransform: 'capitalize'}}
                      />
                      <List.Item title={`Rate : ${loanDetails.rate}`} />
                      <List.Item title={`Tenor : ${loanDetails.tenor}`} />
                      <List.Item
                        title={`Amount : ${loanDetails.amount}`}
                        right={_ => <List.Icon icon={'currency-usd-circle'} />}
                      />

                      {loanDetails?.borrower && (
                        <List.Accordion title="Borrower Details">
                          <List.Item
                            title={`ID  :  ${loanDetails.borrower._id}`}
                          />
                          <List.Item
                            title={`Name  :  ${loanDetails.borrower.name}`}
                          />
                          <List.Item
                            title={`Email  :  ${loanDetails.borrower.email}`}
                          />
                        </List.Accordion>
                      )}

                      {loanDetails?.lender && (
                        <List.Accordion title="Lender Details">
                          <List.Item
                            title={`ID  :  ${loanDetails.lender._id}`}
                          />
                          <List.Item
                            title={`Name  :  ${loanDetails.lender.name}`}
                          />
                          <List.Item
                            title={`Email  :  ${loanDetails.lender.email}`}
                          />
                        </List.Accordion>
                      )}
                    </List.Accordion>
                    <Divider
                      style={{
                        margin: 10,
                      }}
                    />
                  </View>
                );
              })}
            </List.Section>
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyImg: {
    width: 500,
    height: 500,
    transform: [{scale: 0.5}],
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonStyle: {
    elevation: 2,
    width: 'auto',
    borderRadius: 10,
  },
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
});

export default MyAccountScreen;
