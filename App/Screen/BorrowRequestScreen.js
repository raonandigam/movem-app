import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Card, Chip} from 'react-native-paper';
//Components
import Spacer from '../Components/Spacer';

const BorrowRequest = props => {
  return (
    <View style={styles.viewStyle}>
      <View style={{alignSelf: 'center'}}>
        <Spacer />
        <Text style={styles.textStyles}>Borrow Requests</Text>
      </View>
      <Spacer />
      <Spacer />
      <Card style={styles.cardView}>
        <Card.Content>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.title}>Name : Ram</Text>
              <Text style={styles.title}>Tenor : 1year</Text>
            </View>
            <Chip
              style={[styles.successString, styles.infochip]}
              icon={() => (
                <Icon name={'shield-check'} size={16} color="white" />
              )}
              onPress={() =>
                props.navigation.navigate('Status Request', {
                  status: data.type,
                })
              }
              mode="outlined">
              <Text style={{color: 'white'}}>Success</Text>
            </Chip>
          </View>
        </Card.Content>
      </Card>
      <Spacer />
      <Card style={styles.cardView}>
        <Card.Content>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.title}>Name : Lakshman</Text>
              <Text style={styles.title}>Tenor : 3 year</Text>
            </View>
            <Chip
              style={[styles.pendingString, styles.infochip]}
              icon={() => (
                <Icon name={'shield-alert'} size={16} color="white" />
              )}
              // onPress={() =>
              //   props.navigation.navigate('Status Request', {
              //     status: data.type,
              //   })}

              mode="outlined">
              <Text
                style={{
                  color: 'white',
                  marginLeft: 50,
                }}>
                Pending
              </Text>
            </Chip>
          </View>
        </Card.Content>
      </Card>
      <Spacer />
      <Button
        mode="contained"
        icon="home"
        style={styles.button}
        onPress={() => props.navigation.navigate('Dashboard')}>
        Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    margin: '3%',
  },
  textStyles: {
    alignContent: 'center',
    fontSize: 25,
  },
  cardView: {
    elevation: 6,
    borderRadius: 20,
    padding: '5%',
    width: '100%',
  },
  infochip: {
    top: -20,
    right: -20,
    position: 'absolute',
  },
  button: {
    marginTop: '10%',
    elevation: 2,
    width: '48%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  successString: {
    backgroundColor: '#3D7804',
    borderRadius: 18,
  },
  pendingString: {
    backgroundColor: '#F51818',
    borderRadius: 18,
  },
});

export default BorrowRequest;
