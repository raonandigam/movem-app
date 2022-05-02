import {configureStore} from '@reduxjs/toolkit';

import AuthReducer from './authSlice';
import SnackBarMessageReducer from './snackBarMessageSlice';
import UserReducer from './userSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    snackBarMessage: SnackBarMessageReducer,
    user: UserReducer,
  },
});
