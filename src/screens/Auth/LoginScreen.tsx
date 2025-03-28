import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import LinearGradient from 'react-native-linear-gradient';
import ButtonLocal from '../../components/common/ButtonLocal';
import HeaderBack from '../../components/common/HeaderBack';
import IconButton from '../../components/common/IconButton';
import InputLocal from '../../components/common/InputLocal';
import styles from '../../styles/authStyles';
import {IntroSkipButtonProps} from '../../types/types';

const {width, height} = Dimensions.get('window');

const LoginScreen: React.FC<IntroSkipButtonProps> = ({navigation}) => {
  const [showPass, setShowPass] = useState<boolean>(false);

  const navigateToRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const eyeToggleHandler = () => {
    setShowPass(prev => !prev);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/auth-background-1.jpg')}
      style={{flex: 1}}
      resizeMode="cover"
      blurRadius={10}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)']}
        style={{flex: 1}}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <HeaderBack />
          <ScrollView
            keyboardShouldPersistTaps={
              Platform.OS === 'android' ? 'handled' : undefined
            }>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Welcome back!</Text>
              <Text style={styles.headerText}>Glad to see you,Again</Text>
            </View>

            <KeyboardAvoidingView
              behavior="padding"
              style={styles.formContainer}>
              <View>
                <InputLocal
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  textColor="rgba(255, 255, 255, 0.5)"
                />
                <IconButton
                  iconName="mail-outline"
                  iconSize={18}
                  iconColor="rgba(255, 255, 255, 0.8)"
                  activeOpacity={1}
                />
              </View>
              <View>
                <InputLocal
                  placeholder="Enter your password"
                  textColor="rgba(255, 255, 255, 0.5)"
                  secureTextEntry={!showPass}
                />
                <IconButton
                  iconName={!showPass ? 'eye-off-outline' : 'eye-outline'}
                  iconSize={18}
                  iconColor="rgba(255, 255, 255, 0.8)"
                  onPress={eyeToggleHandler}
                />
              </View>
              <ButtonLocal
                title="Log in"
                buttonStyle={{backgroundColor: '#B71C1C'}}
              />
              <View style={styles.bottomContainer}>
                <Text style={styles.alreadySigninText}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={navigateToRegister}>
                  <Text style={styles.signinText}>Sign up now</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default LoginScreen;
