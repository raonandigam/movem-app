import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  type: null,
  message: null,
};

export const snackBarMessageSlice = createSlice({
  name: 'snackBarMessage',
  initialState,
  reducers: {
    updateMessage: (state, {payload}) => {
      state.type = payload.type;
      state.message = payload.message;
    },
    resetSnackBar: state => {
      state.type = null;
      state.message = null;
    },
  },
});

export const {updateMessage, resetSnackBar} = snackBarMessageSlice.actions;

export default snackBarMessageSlice.reducer;
