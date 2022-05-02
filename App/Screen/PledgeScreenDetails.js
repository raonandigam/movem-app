import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Card, Button} from 'react-native-paper';
//Component
import Spacer from '../Components/Spacer';

const PledgeScreenDetails = props => {
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const PledgeDetailsRender = () => {
    return (
      <View style={styles.detailsView}>
        <Card style={styles.cardView}>
          <Card.Title titleStyle={styles.titleStyle} title={'Pledge Details'} />
          <Card.Content style={{marginTop: 17}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Name : </Text>
              <Text style={{fontSize: 17}}>Ram</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Amount : </Text>
              <Text style={{fontSize: 17}}>$ 10,000</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Rate : </Text>
              <Text style={{fontSize: 17}}>1.5 </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Tenor : </Text>
              <Text style={{fontSize: 17}}>1 Year Year</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textView}>Connection :</Text>
              <Text style={{fontSize: 17}}> Second</Text>
            </View>

            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 18, fontWeight: '500'}}>
                Token Information
              </Text>
              <Text style={{fontSize: 16, marginLeft: 3}}>Token 1</Text>
              <Text style={{fontSize: 16, marginLeft: 3}}>Token 2</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  const handleRequsetSubmitted = () => {
    setRequestSubmitted(true);
  };
  return (
    <View style={styles.viewStyle}>
      {requestSubmitted && (
        <View style={{alignSelf: 'center'}}>
          <Spacer></Spacer>
          <Text style={{fontSize: 25}}>Request Submitted</Text>
        </View>
      )}
      <View>
        <PledgeDetailsRender />
        {!requestSubmitted && (
          <View
            style={{
              width: '50%',
              alignSelf: 'center',
              marginTop: '10%',
            }}>
            <Button
              style={{borderRadius: 10}}
              onPress={() => handleRequsetSubmitted()}
              mode="contained">
              Confirm
            </Button>
          </View>
        )}
      </View>

      {requestSubmitted && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '3%',
          }}>
          <Button
            mode="contained"
            compact={true}
            onPress={() => props.navigation.navigate('Account')}
            style={styles.button}
            icon="account">
            <Text style={styles.textStyle}>My Account</Text>
          </Button>
          <Button
            icon="home"
            mode="contained"
            style={styles.button}
            onPress={() => props.navigation.navigate('Dashboard')}>
            <Text style={styles.textStyle}>Home</Text>
          </Button>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsView: {
    padding: 17,
    marginTop: '10%',
    justifyContent: 'center',
  },
  titleStyle: {
    flex: 1,
    alignSelf: 'center',
    color: 'green',
  },
  cardView: {
    padding: 1,
    borderRadius: 25,
    elevation: 10,
  },
  button: {
    marginTop: '10%',
    elevation: 2,
    width: '48%',
    alignSelf: 'center',
    borderRadius: 10,
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

  textView: {
    fontSize: 17,
    fontWeight: '800',
  },
});
export default PledgeScreenDetails;
