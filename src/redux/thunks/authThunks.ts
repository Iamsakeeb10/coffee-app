import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  updateProfile,
} from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    {
      email,
      password,
      displayName,
    }: {email: string; password: string; displayName: string},
    {rejectWithValue},
  ) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {displayName});

      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential?.user.displayName,
        emailVerified: userCredential.user.emailVerified,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, {rejectWithValue}) => {
    try {
      const auth = getAuth();
      await signOut(auth);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
