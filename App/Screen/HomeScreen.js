import React from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {useDispatch} from 'react-redux';
// Dispatch
import {hideIntro} from '../../Redux/authSlice';

const HomeScreen = props => {
  const dispatch = useDispatch();
  const handleOrSkip = () => {
    dispatch(hideIntro());
  };

  return (
    <Onboarding
      onDone={handleOrSkip}
      onSkip={handleOrSkip}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/image/borrowSplash.png')}
              resizeMode="contain"
              style={{width: 300, height: 300}}
            />
          ),
          title: 'Buy',
          subtitle: 'Buy crypto with little less hassel and more with comfort.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/image/lendSplash.png')}
              resizeMode="contain"
              style={{width: 300, height: 300}}
            />
          ),
          title: 'Transfer',
          subtitle: 'Transfer USD to INR ',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/image/pledgeSplash.png')}
              resizeMode="contain"
              style={{width: 300, height: 300}}
            />
          ),
          title: 'Convert',
          subtitle: 'Convert USD to INR ',
        },
      ]}
    />
  );
};

export default HomeScreen;
