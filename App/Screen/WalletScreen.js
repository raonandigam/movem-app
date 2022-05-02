import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

const WalletScreen = props => {
  const [imguri, setImageuri] = useState('');

  const selectImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('Image cancel');
      } else if (response.error) {
        console.log('error');
      } else {
        const uri = response.assets[0].uri;
        setImageuri(uri);
        console.log(uri);
      }
    });
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.textview}>Creat Wallet Screen</Text>
      <Text style={{fontSize: 20, marginLeft: 120}}>Enter Tax id</Text>

      <Image
        source={{uri: imguri !== '' ? imguri : undefined}}
        style={styles.imagstyle}
      />

      <View style={styles.uploadui}>
        <Button onPress={() => selectImage()}>Upload Pic</Button>
      </View>

      <View style={styles.uploadui}>
        <Button onPress={() => selectImage()}>Add More Docs</Button>
      </View>
      <FlatList />

      <View style={styles.confirm}>
        <Button onPress={() => props.navigation.navigate('Account')}>
          Confirm
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  textview: {
    fontSize: 30,
    margin: 40,
    marginLeft: 60,
  },
  uploadui: {
    width: '50%',
    marginTop: 40,
    marginLeft: 100,
  },
  imagstyle: {
    width: '50%',
    height: '35%',
    marginLeft: 100,
    marginTop: 10,
  },
  confirm: {
    marginTop: 80,
  },
});
export default WalletScreen;
