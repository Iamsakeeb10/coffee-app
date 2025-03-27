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

import ButtonLocal from '../../components/common/ButtonLocal';
import HeaderBack from '../../components/common/HeaderBack';
import IconButton from '../../components/common/IconButton';
import InputLocal from '../../components/common/InputLocal';
import styles from '../../styles/RegisterScreenStyles';
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

  console.log(showPass);

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
      blurRadius={6}>
      <SafeAreaView style={{width: width / 1.2, alignSelf: 'center'}}>
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

          <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
            <View>
              <InputLocal
                placeholder="Enter your name"
                textColor="rgba(255, 255, 255, 0.5)"
              />
              <IconButton
                iconName="person-outline"
                iconSize={18}
                iconColor="rgba(255, 255, 255, 0.8)"
                activeOpacity={1}
              />
            </View>
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
                secureTextEntry={!showPass.password}
              />
              <IconButton
                iconName={
                  !showPass.password ? 'eye-off-outline' : 'eye-outline'
                }
                iconSize={18}
                iconColor="rgba(255, 255, 255, 0.8)"
                onPress={() => {
                  eyeToggleHandler('password');
                }}
              />
            </View>
            <View>
              <InputLocal
                placeholder="Enter your confirm password"
                textColor="rgba(255, 255, 255, 0.5)"
                secureTextEntry={!showPass.confirmPassword}
              />
              <IconButton
                iconName={
                  !showPass.confirmPassword ? 'eye-off-outline' : 'eye-outline'
                }
                iconSize={18}
                iconColor="rgba(255, 255, 255, 0.8)"
                onPress={() => {
                  eyeToggleHandler('confirmPassword');
                }}
              />
            </View>

            <ButtonLocal
              title="Sign up"
              buttonStyle={{backgroundColor: 'rgba(0, 121, 107, 1.0)'}}
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
    </ImageBackground>
  );
};

export default RegisterScreen;
