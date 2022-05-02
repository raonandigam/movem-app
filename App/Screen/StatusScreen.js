import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Spacer from '../Components/Spacer';
import {Card} from 'react-native-shadow-cards';

const StatusScreen = props => {
  const [requestType, setRequestType] = useState(props.route.params.status);

  const LendDetailsRender = () => {
    return (
      <View>
        <Text style={styles.header}>Loan Request</Text>
        <Card style={{margin: 10}}>
          <Text style={{fontSize: 17}}>Name : Kousthub</Text>
          <Text style={{fontSize: 17}}>Amount : $ 4000</Text>
          <Text style={{fontSize: 17}}>Tenor : 30 year</Text>
          <Text style={{fontSize: 17}}>Connection : Second</Text>
        </Card>
        <Text style={styles.header}>Collateral</Text>
        <Card style={{margin: 10}}>
          <Text style={{fontSize: 17}}>Type : Token</Text>
          <Text style={{fontSize: 19}}>Tokenised Value : $ 0</Text>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>Token Code : 5</Text>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.viewStyle}>
      <View style={{alignSelf: 'center'}}>
        <Spacer />
        <Text style={styles.textStyles}>
          {requestType === 'success'
            ? 'Lending Successfull'
            : 'Request Submitted'}
        </Text>
      </View>
      <View style={styles.buttonStyle}>
        {/* Lend Info */}
        <LendDetailsRender />
        <Spacer />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Pressable
            style={styles.button}
            onPress={() =>
              props.navigation.navigate(
                requestType === 'success' ? 'Account' : 'Lend',
              )
            }>
            <Text style={styles.textStyle}>
              {requestType === 'success' ? 'My Account' : 'Go to Lend Requests'}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => props.navigation.navigate('Dashboard')}>
            <Text style={styles.textStyle}>Home</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    margin: 10,
    marginHorizontal: 15,
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
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
  },
  button: {
    borderRadius: 20,
    marginTop: '10%',
    padding: 10,
    elevation: 2,
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#3380FF',
  },
  Cbutton: {
    borderRadius: 10,
    marginTop: '10%',
    padding: 10,
    elevation: 2,
    width: '55%',
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
});

export default StatusScreen;
