import React, {Children} from 'react';
import {StyleSheet, View} from 'react-native';

const Spacer = ({children}) => {
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    margin: 20,
  },
});

export default Spacer;
