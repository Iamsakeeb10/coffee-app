import {createSlice} from '@reduxjs/toolkit';
import {
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from '../thunks/authThunks';

interface AuthState {
  user: any;
  loading: boolean;
  googleLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  googleLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    clearUser: state => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, state => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(googleLogin.pending, state => {
        state.googleLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.googleLoading = false;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.googleLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.pending, state => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log('Logout fulfilled reducer running');
        state.loading = false;
        state.user = null;
        state.error = null;
        console.log('User set to null in reducer');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {...state.user, ...action.payload};
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setUser, clearUser} = authSlice.actions;

export default authSlice.reducer;
