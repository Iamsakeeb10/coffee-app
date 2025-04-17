import auth, {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {colors} from '../../constants/colors';
import {showSnack} from '../../utils/Snack';

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

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (_, {rejectWithValue}) => {
    try {
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.getTokens();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      };
    } catch (error: any) {
      if (error.code === 'getTokens') {
        showSnack('Google Sign-In was canceled', {
          duration: 3000,
          backgroundColor: colors.deepRed,
          textColor: colors.white,
          actionText: 'Okay',
          actionColor: colors.white,
        });
      }
      if (error && typeof error === 'object') {
        const errorMessage =
          error.message ||
          (error.code ? `Error code: ${error.code}` : 'Google Sign-in failed');
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Google Sign-in failed. Please try again.');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, {rejectWithValue}) => {
    try {
      const authInstance = getAuth();

      const googleUser = GoogleSignin.getCurrentUser();

      if (authInstance.currentUser) {
        await signOut(authInstance);
      }

      if (googleUser) {
        console.log('Google Sign');
        await GoogleSignin.signOut();
      }

      return null;
    } catch (error: any) {
      console.log('Logout Error:', error);
      return rejectWithValue(error?.message || 'Failed to log out');
    }
  },
);
