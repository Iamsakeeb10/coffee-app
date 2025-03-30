import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
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
import AnimatedErrorText from '../../components/Auth/AnimatedErrorText';
import ButtonLocal from '../../components/Common/ButtonLocal';
import IconButton from '../../components/Common/IconButton';
import InputLocal from '../../components/Common/InputLocal';
import {colors} from '../../constants/colors';
import styles from '../../styles/authStyles';
import {
  IntroSkipButtonProps,
  LoginUserInput,
  LoginValidationResult,
  UserInputErrors,
} from '../../types/types';
import {loginValidation} from '../../utils/validator';

const initialUserInput: LoginUserInput = {
  enteredEmail: '',
  enteredPassword: '',
};

const LoginScreen: React.FC<IntroSkipButtonProps> = ({navigation}) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<LoginUserInput>(initialUserInput);
  const [userInputErrors, setUserInputErrors] = useState<UserInputErrors>({});

  const handleUserInputChange = (
    field: keyof LoginUserInput,
    value: string,
  ) => {
    const updatedInput = {...userInput, [field]: value};
    setUserInput(updatedInput);
    if (userInputErrors[`${field}Error`]) {
      setUserInputErrors((prevInputError: UserInputErrors) => ({
        ...prevInputError,
        [`${field}Error`]: '',
      }));
    }
  };

  const hasValidationError = (validationResult: LoginValidationResult) => {
    return validationResult.emailError || validationResult.passwordError;
  };

  const setValidationErrors = (validationResult: LoginValidationResult) => {
    setUserInputErrors({
      enteredEmailError: validationResult.emailError,
      enteredPasswordError: validationResult.passwordError,
    });
  };

  const resetValidationErrors = () => {
    setUserInputErrors({
      enteredEmailError: '',
      enteredPasswordError: '',
    });
  };

  const handleSubmit = () => {
    // if (loading) return;

    console.log(userInputErrors);

    Keyboard.dismiss();

    const {enteredEmail, enteredPassword} = userInput;

    const validationResult = loginValidation(enteredEmail, enteredPassword);
    const validationError = hasValidationError(validationResult);

    if (validationError) {
      setValidationErrors(validationResult);
      return;
    } else {
      resetValidationErrors();
    }

    // setLoading(true);

    // try {
    //   const trimmedIMEI = enteredIMEI.trim();

    //   const data = await checkDevice(trimmedIMEI, userInfo);
    //   console.log('IMEI API Data:', data);

    //   if (data.status === 'Device not found') {
    //     onNext();
    //   } else {
    //     deviceAddedAlert();
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
  };

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
        colors={[colors.linearGradientStart, colors.linearGradientEnd]}
        style={{flex: 1}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <SafeAreaView style={styles.safeAreaContainer}>
          <ScrollView
            keyboardShouldPersistTaps={
              Platform.OS === 'android' ? 'handled' : undefined
            }>
            <View style={[styles.headerTextContainer, {marginTop: 0}]}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/images/logo-2.png')}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.headerText, {textAlign: 'left'}]}>
                Welcome back!
              </Text>
              <Text style={styles.headerText}>Glad to see you,Again</Text>
            </View>

            <KeyboardAvoidingView
              behavior="padding"
              style={styles.formContainer}>
              <View>
                <InputLocal
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  textColor={colors.inputTextColor}
                  value={userInput.enteredEmail}
                  onChange={val => handleUserInputChange('enteredEmail', val)}
                  error={userInputErrors.enteredEmailError}
                />
                <IconButton
                  iconName="mail-outline"
                  iconSize={18}
                  iconColor={colors.iconColor}
                  activeOpacity={1}
                />
              </View>
              <View>
                {userInputErrors.enteredEmailError && (
                  <AnimatedErrorText
                    errorText={userInputErrors.enteredEmailError}
                    color={colors.deepRed}
                  />
                )}
              </View>
              <View>
                <InputLocal
                  placeholder="Enter your password"
                  textColor={colors.inputTextColor}
                  secureTextEntry={!showPass}
                  value={userInput.enteredPassword}
                  onChange={val =>
                    handleUserInputChange('enteredPassword', val)
                  }
                  error={userInputErrors.enteredPasswordError}
                />
                <IconButton
                  iconName={!showPass ? 'eye-off-outline' : 'eye-outline'}
                  iconSize={18}
                  iconColor={colors.iconColor}
                  onPress={eyeToggleHandler}
                />
              </View>
              <View>
                {userInputErrors.enteredPasswordError && (
                  <AnimatedErrorText
                    errorText={userInputErrors.enteredPasswordError}
                    color={colors.deepRed}
                  />
                )}
              </View>

              <ButtonLocal
                title="Log in"
                buttonStyle={{backgroundColor: colors.btnRed}}
                onPressHandler={handleSubmit}
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
