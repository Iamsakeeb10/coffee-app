import {GoogleSignin} from '@react-native-google-signin/google-signin';
import BootSplash from 'react-native-bootsplash';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '489138177367-kj3n96r5porklsq3fjg0h2miiscdat8r.apps.googleusercontent.com',
    offlineAccess: true,
  });
};

export const initApp = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  await BootSplash.hide({fade: true});
};
