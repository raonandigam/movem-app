import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userName: null,
  wallet_address: null,
  circle_wallet: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, {payload}) => {
      state.userName = payload.userName;
      state.userId = payload.userId;
      state.wallet_address = payload.wallet_address;
      state.circle_wallet = payload.circle_wallet;
    },
    resetUserDetails: state => {
      state.userName = null;
      state.userId = null;
      state.wallet_address = null;
      state.circle_wallet = null;
    },
  },
});

export const {updateUserDetails, resetUserDetails} = userSlice.actions;

export default userSlice.reducer;
