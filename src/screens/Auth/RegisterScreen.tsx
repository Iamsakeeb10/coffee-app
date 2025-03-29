import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import LinearGradient from 'react-native-linear-gradient';
import ButtonLocal from '../../components/Common/ButtonLocal';
import HeaderBack from '../../components/Common/HeaderBack';
import IconButton from '../../components/Common/IconButton';
import InputLocal from '../../components/Common/InputLocal';
import {colors} from '../../constants/colors';
import styles from '../../styles/authStyles';
import {IntroSkipButtonProps} from '../../types/types';

const {width, height} = Dimensions.get('window');

const RegisterScreen: React.FC<IntroSkipButtonProps> = ({navigation}) => {
  const [showPass, setShowPass] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const eyeToggleHandler = (field: keyof typeof showPass) => {
    setShowPass(prevState => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <ImageBackground
      source={require('../../assets/images/auth-background-1.jpg')}
      style={{flex: 1}}
      resizeMode="cover"
      blurRadius={10}>
      <LinearGradient
        colors={[colors.linearGradientStart, colors.linearGradientEnd]}
        style={{flex: 1}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <SafeAreaView style={styles.safeAreaContainer}>
          <HeaderBack />
          <ScrollView
            keyboardShouldPersistTaps={
              Platform.OS === 'android' ? 'handled' : undefined
            }>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>
                Hello, Register here to get started.
              </Text>
            </View>

            <KeyboardAvoidingView
              behavior="padding"
              style={styles.formContainer}>
              <View>
                <InputLocal
                  placeholder="Enter your name"
                  textColor={colors.inputTextColor}
                />
                <IconButton
                  iconName="person-outline"
                  iconSize={18}
                  iconColor={colors.iconColor}
                  activeOpacity={1}
                />
              </View>
              <View>
                <InputLocal
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  textColor={colors.inputTextColor}
                />
                <IconButton
                  iconName="mail-outline"
                  iconSize={18}
                  iconColor={colors.iconColor}
                  activeOpacity={1}
                />
              </View>
              <View>
                <InputLocal
                  placeholder="Enter your password"
                  textColor={colors.inputTextColor}
                  secureTextEntry={!showPass.password}
                />
                <IconButton
                  iconName={
                    !showPass.password ? 'eye-off-outline' : 'eye-outline'
                  }
                  iconSize={18}
                  iconColor={colors.iconColor}
                  onPress={() => {
                    eyeToggleHandler('password');
                  }}
                />
              </View>
              <View>
                <InputLocal
                  placeholder="Enter your confirm password"
                  textColor={colors.inputTextColor}
                  secureTextEntry={!showPass.confirmPassword}
                />
                <IconButton
                  iconName={
                    !showPass.confirmPassword
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  iconSize={18}
                  iconColor={colors.iconColor}
                  onPress={() => {
                    eyeToggleHandler('confirmPassword');
                  }}
                />
              </View>

              <ButtonLocal
                title="Sign up"
                buttonStyle={{backgroundColor: colors.primaryGreen}}
              />
              <View style={styles.bottomContainer}>
                <Text style={styles.alreadySigninText}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={styles.signinText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default RegisterScreen;
