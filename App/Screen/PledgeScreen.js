import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Card, Button} from 'react-native-paper';
// Components
import Spacer from '../Components/Spacer';

const PledgeScreen = props => {
  return (
    <View style={styles.viewStyle}>
      <Spacer />
      <View style={{alignSelf: 'center'}}>
        <Text style={{fontSize: 17}}> Select Loan to Pledge</Text>
        <Button
          style={{
            borderRadius: 20,
            width: '30%',
            alignSelf: 'center',
            marginTop: 10,
          }}
          mode="contained">
          Filter
        </Button>
      </View>

      <View>
        <Card style={styles.cardStyles}>
          <View style={{flexDirection: 'row'}}>
            <Card.Content>
              <Text style={{fontSize: 17}}> Amount :$10,000</Text>
              <Text style={{fontSize: 17}}> Tenor :2 Year</Text>
            </Card.Content>
            <Button
              mode="outlined"
              icon="arrow-right"
              style={{
                borderRadius: 14,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              contentStyle={{
                flexDirection: 'row-reverse',
              }}
              onPress={() => props.navigation.navigate('Pledge Info')}>
              Pledge
            </Button>
          </View>
        </Card>
      </View>
      <View>
        <Card style={styles.cardStyles}>
          <View style={{flexDirection: 'row'}}>
            <Card.Content>
              <Text style={{fontSize: 17}}> Amount :$8,000</Text>
              <Text style={{fontSize: 17}}> Tenor :2 Year</Text>
            </Card.Content>
            <Button
              mode="outlined"
              icon="arrow-right"
              style={{
                borderRadius: 14,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              contentStyle={{
                flexDirection: 'row-reverse',
              }}
              onPress={() => props.navigation.navigate('Pledge Info')}>
              Pledge
            </Button>
          </View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    margin: '6%',
  },
  buttonStyle: {
    width: '60%',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: '13%',
  },
  inputview: {
    justifyContent: 'center',
    width: '60%',
    alignSelf: 'center',
    marginTop: '16%',
    alignContent: 'center',
  },
  headerText: {
    alignSelf: 'center',
    color: '#138D75',
    marginTop: '10%',
    fontSize: 20,
  },
  cardStyles: {
    margin: '1%',
    borderRadius: 17,
    elevation: 6,
    marginTop: '10%',
    padding: 18,
  },
});

export default PledgeScreen;
