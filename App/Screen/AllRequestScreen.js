import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Card, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
//Component
import Spacer from '../Components/Spacer';

const AllRequest = props => {
  return (
    <View style={styles.viewStyle}>
      <View style={{alignSelf: 'center'}}>
        <Spacer />
        <Text style={styles.textStyles}>All Requests</Text>
      </View>
      <Spacer />
      <Spacer />
      <ScrollView>
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
                // onPress={() => props.navigation.navigate('Status Request')}
                mode="outlined">
                <Text
                  style={{
                    color: 'white',
                  }}>
                  Success
                </Text>
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
                <Text style={styles.title}>Tenor : 2 year</Text>
              </View>
              <Chip
                style={[styles.pendingString, styles.infochip]}
                icon={() => (
                  <Icon name={'shield-alert'} size={16} color="white" />
                )}
                // onPress={() => props.navigation.navigate('Status Request')}

                mode="outlined">
                <Text style={{color: 'white'}}>Pending</Text>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    margin: '3%',
    marginHorizontal: '3%',
  },
  textStyles: {
    alignContent: 'center',
    fontSize: 25,
  },
  buttonStyle: {
    marginTop: '30%',
    borderRadius: 40,
    fontSize: 40,
  },
  infochip: {
    top: -20,
    right: -20,
    position: 'absolute',
  },
  cardView: {
    elevation: 6,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    backgroundColor: 'white',
  },
  item: {
    padding: 5,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: '10%',
    elevation: 2,
    width: '48%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    position: 'relative',
    fontSize: 22,
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

export default AllRequest;
