import React from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
// Dispatch
import {resetSnackBar} from '../../Redux/snackBarMessageSlice';

function SnackBarComponent() {
  const {type, message} = useSelector(state => state.snackBarMessage);
  const dispatch = useDispatch();
  return (
    message && (
      <Snackbar
        visible={message ?? false}
        onDismiss={() => {
          dispatch(resetSnackBar());
        }}
        duration={type === 'success' ? 2000 : 1500}
        style={
          type === 'success' ? styles.successResponse : styles.errorResponse
        }>
        {message}
      </Snackbar>
    )
  );
}

const styles = StyleSheet.create({
  successResponse: {
    backgroundColor: '#2EB086',
  },
  errorResponse: {
    backgroundColor: '#FC4F4F',
  },
});

export default SnackBarComponent;
