import React, { Fragment, useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View, ScrollView, TouchableHighlight} from 'react-native';
//Components
import Spacer from '../Components/Spacer';
import CardComponent from '../Components/CardComponent';
import DialogAction from "../Components/DialogAction";

const DashBoardScreen = props => {
  const {isKycVerified} = useSelector(state => state.auth);
  const [showModal, setShowModal] = useState(false);
    
    useEffect(()=>{
      console.log("isKycVerified", isKycVerified)
    },[]);

    showHideModal = (value) => {
      setShowModal(value)
    }

    return (
      <Fragment>
        {!showModal && <DialogAction navigation={props.navigation} showHideModal={showHideModal}/>}
        <ScrollView>
        <View style={styles.mainView}>
          <TouchableHighlight
            onPress={() => props.navigation.navigate('BuyUSDC')}
            style={{borderRadius: 20}}>
            <View>
              <CardComponent
                title="Buy USD"
                source={require('../assets/image/borrowSplash.png')}
                content="Fund your USD wallet"
              />
            </View>
          </TouchableHighlight>
          <Spacer />
          <TouchableHighlight
            onPress={() => props.navigation.navigate('TransferUSDC')}
            style={{borderRadius: 20}}>
            <View>
              <CardComponent
                title="Transfer USD"
                source={require('../assets/image/lendSplash.png')}
                content="Transfer USD to external blockchain."
              />
            </View>
          </TouchableHighlight>
          <Spacer />
          {/* <TouchableHighlight
            onPress={() => props.navigation.navigate('Convert NUSD to INR')}
            style={{borderRadius: 20}}>
            <View>
              <CardComponent
                title="Convert USD"
                source={require('../assets/image/pledgeSplash.png')}
                content="Convert USD to INR"
              />
            </View>
          </TouchableHighlight> */}
          {/* <Spacer />
          <TouchableHighlight
            style={{borderRadius: 20}}
            onPress={() => props.navigation.navigate('Lend')}>
            <View>
              <CardComponent
                title="Lend"
                source={require('../assets/image/lend.png')}
                content="Lend money to earn interest"
              />
            </View>
          </TouchableHighlight>
          <Spacer />
          <TouchableHighlight
            onPress={() => props.navigation.navigate('Borrow')}
            style={{borderRadius: 20}}>
            <View>
              <CardComponent
                title="Borrow"
                source={require('../assets/image/borrow.jpg')}
                content="Borrow money without credit history"
              />
            </View>
          </TouchableHighlight> */}
        </View>
      </ScrollView>
      </Fragment>
      
    );
  
  
};

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    padding: 40,
    flex: 1,
  },
});

export default DashBoardScreen;
