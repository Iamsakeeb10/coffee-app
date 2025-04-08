import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log('Login Credentail =>>', userCredential);

      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        emailVerified: userCredential.user.emailVerified,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async _ => {
  try {
    const auth = getAuth();

    if (auth.currentUser) {
      await signOut(auth);
    }
    return null;
  } catch (error) {
    return null;
  }
});
