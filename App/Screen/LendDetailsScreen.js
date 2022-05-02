import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card} from 'react-native-paper';
// Components
import Spacer from '../Components/Spacer';
// Service
import {createLendRequest} from '../Services/lendService';
// Dispatch
import {updateMessage} from '../../Redux/snackBarMessageSlice';

const LendDetailsScreen = props => {
  const {params} = props.route;
  const {jwtToken} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleLoadRequestConfirm = async () => {
    setisLoading(true);
    const response = await createLendRequest(jwtToken, {
      loanId: params._id,
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
    setisLoading(false);
    setRequestSubmitted(true);
  };

  const LendDetailsRender = () => {
    return (
      <View style={styles.detailsView}>
        {/* Loan Request Card Components */}
        <Card style={styles.cardView}>
          <Card.Title
            titleStyle={{flex: 1, alignSelf: 'center', color: 'green'}}
            title={'Loan Details'}
          />
          <Card.Content style={{marginTop: 17}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Loan ID :</Text>
              <Text style={{fontSize: 17}}> {params._id}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Amount : </Text>
              <Text style={{fontSize: 17}}>$ {params.amount}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Tenor : </Text>
              <Text style={{fontSize: 17}}>{params.tenor} year</Text>
            </View>

            <View style={{marginTop: '6%'}}>
              <Text style={{fontSize: 18, fontWeight: '700'}}>
                Borrower Details
              </Text>
              <View style={{flexDirection: 'row', marginTop: '2%'}}>
                <Text style={{fontSize: 19, fontWeight: '600'}}>Id : </Text>
                <Text style={{fontSize: 17}}>{params.borrower._id} </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: '2%'}}>
                <Text style={{fontSize: 19, fontWeight: '600'}}>Name : </Text>
                <Text style={{fontSize: 17}}>{params.borrower.name} </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: '2%'}}>
                <Text style={{fontSize: 19, fontWeight: '600'}}>Email : </Text>
                <Text style={{fontSize: 17}}>{params.borrower.email} </Text>
              </View>
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
        <LendDetailsRender />
        <Spacer />
        {!requestSubmitted && params._id && (
          <Button
            mode="contained"
            disabled={isLoading}
            loading={isLoading}
            style={isConfirm ? styles.Cbutton : styles.button}
            onPress={() => {
              if (!isConfirm) {
                setIsConfirm(true);
              } else {
                setIsConfirm(false);
                handleLoadRequestConfirm();
              }
            }}>
            {!isLoading && (isConfirm ? 'Click again to - CONFIRM' : 'Lend')}
          </Button>
        )}
      </View>

      {/* Button after request Submitted */}
      {requestSubmitted && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            mode="contained"
            icon="format-list-text"
            compact={true}
            style={isConfirm ? styles.Cbutton : styles.button}
            onPress={() => props.navigation.navigate('Lend')}>
            <Text style={styles.textStyle}>Lend Requests</Text>
          </Button>
          <Button
            icon="home"
            mode="contained"
            style={isConfirm ? styles.Cbutton : styles.button}
            onPress={() => props.navigation.navigate('Dashboard')}>
            <Text style={styles.textStyle}>Home</Text>
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
    padding: 1,
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
  item: {
    backgroundColor: '#e8e8e8',
    padding: 20,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 22,
  },
  title: {
    fontSize: 24,
  },
  button: {
    marginTop: '10%',
    elevation: 2,
    width: '48%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  Cbutton: {
    marginTop: '10%',
    elevation: 2,
    width: '75%',
    alignSelf: 'center',
    color: '#e8e8e8',
    backgroundColor: '#FF6E33',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  collateralStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    color: 'green',
  },
  textView: {
    fontSize: 17,
    fontWeight: '800',
  },
});

export default LendDetailsScreen;
