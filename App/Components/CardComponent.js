import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Card, Avatar} from 'react-native-paper';

const CardComponent = ({title, source, content}) => {
  return (
    <View>
      <Card style={styles.cardUi}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textStyles}>{title}</Text>
          <Avatar.Image size={80} style={styles.avatStle} source={source} />
        </View>
        <Text style={styles.contentStyle}> {content}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardUi: {
    padding: 30,
    borderRadius: 20,
    elevation: 10,
  },
  textStyles: {
    fontSize: 25,
    marginTop: 10,
  },
  avatStle: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  contentStyle: {
    marginLeft: 1,
    marginTop: 45,
  },
});
export default CardComponent;
