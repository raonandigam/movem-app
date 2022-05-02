import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Card, Headline, Button} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
//component
import InputComponent from '../Components/InputComponent';

const PledgeScreenInfo = props => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('0');
  const TokenList = [
    {
      label: 'Token 1',
      value: 'Ram',
    },
    {
      label: 'Token 2',
      value: 'Lakshman',
    },
    {
      label: 'Token 3',
      value: 'Ravan',
    },
  ];
  return (
    <View style={styles.viewStyle}>
      <Headline style={{alignSelf: 'center'}}>Loan Request</Headline>
      <View>
        <Card style={styles.cardStyles}>
          <Card.Content>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textstyles}>Name:</Text>
              <Text style={{fontSize: 17}}>Ram</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textstyles}>Amount: </Text>
              <Text style={{fontSize: 17}}>$ 10,000</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textstyles}>Tenor: </Text>
              <Text style={{fontSize: 17}}>1 Year</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textstyles}>Connection :</Text>
              <Text style={{fontSize: 17}}> Second</Text>
            </View>
          </Card.Content>

          <View style={styles.dropDownView}>
            <DropDown
              label={'Token'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={token}
              setValue={setToken}
              list={TokenList}
              dropDownStyle={{width: '40%'}}
            />
          </View>
          <View style={{padding: 42}}>
            <InputComponent
              textLabel={'Amount *'}
              textValue={amount}
              onChangeText={setAmount}
              renderKeyboardType="decimal-pad"
            />
          </View>

          <View>
            <Button
              style={styles.buttonStyle}
              mode="contained"
              onPress={() => props.navigation.navigate('PledgeDetails')}>
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
  cardStyles: {
    margin: '1%',
    borderRadius: 17,
    elevation: 6,
    marginTop: '10%',
    padding: 18,
  },
  buttonStyle: {
    borderRadius: 10,
    marginTop: '4%',
    elevation: 2,
    width: '75%',
    alignSelf: 'center',
  },
  textstyles: {
    fontSize: 17,
    fontWeight: '800',
  },
  dropDownView: {
    width: '70%',
    alignSelf: 'center',
    marginTop: '8%',
  },
});
export default PledgeScreenInfo;
