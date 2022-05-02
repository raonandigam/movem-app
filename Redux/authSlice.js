import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  jwtToken: null,
  skipIntro: false,
  isKycVerified:false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, {payload}) => {
      state.loggedIn = payload.loggedIn;
      state.jwtToken = payload.jwtToken;
      state.isKycVerified = payload.isKycVerified;
    },
    logOut: state => {
      state.loggedIn = false;
      state.jwtToken = null;
      state.isKycVerified = false;
    },
    hideIntro: state => {
      state.skipIntro = true;
    },
  },
});

export const {logIn, logOut, hideIntro} = authSlice.actions;

export default authSlice.reducer;
