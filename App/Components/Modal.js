import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

const CustomModal = ({modalVisible, setModalVisible}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Specify filters</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

            {/* Filter Form */}
            <View>
              <View style={styles.filterFields}>
                <Text>Amount ($)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Min"
                  keyboardType="numeric"
                  returnKeyType="done"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Max"
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>
              <View style={styles.filterFields}>
                <Text>Tenor</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Min"
                  keyboardType="numeric"
                  returnKeyType="done"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Max"
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>
              <View style={styles.filterFields}>
                <Text>Network</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Second Connecton"
                  returnKeyType="done"
                />
              </View>
              <View style={styles.filterFields}>
                <Text>Collateral</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Second Connecton"
                  returnKeyType="done"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    overflow: 'visible',
  },
  modalView: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    position: 'absolute',
    top: 50,
    right: 5,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  filterFields: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    // overflow:'visible'
  },
});

export default CustomModal;
