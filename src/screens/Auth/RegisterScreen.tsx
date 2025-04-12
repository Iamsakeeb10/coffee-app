import React, {useState} from 'react';
import {
  Alert,
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
import {useDispatch, useSelector} from 'react-redux';
import AnimatedErrorText from '../../components/Auth/AnimatedErrorText';
import ButtonLocal from '../../components/Common/ButtonLocal';
import HeaderBack from '../../components/Common/HeaderBack';
import IconButton from '../../components/Common/IconButton';
import InputLocal from '../../components/Common/InputLocal';
import {colors} from '../../constants/colors';
import useNetInfo from '../../hooks/useNetInfo';
import {AppDispatch, RootState} from '../../redux/store/store';
import {registerUser} from '../../redux/thunks/authThunks';
import styles from '../../styles/authStyles';
import {
  IntroSkipButtonProps,
  RegUserInput,
  RegValidationResult,
  UserInputErrors,
} from '../../types/types';
import {accountCreatedAlert} from '../../utils/alertHandler';
import {showSnack} from '../../utils/Snack';
import {createAccountValidation} from '../../utils/validator';

const initialUserInput: RegUserInput = {
  enteredName: 'Haseeb',
  enteredEmail: 'haseeb@gmail.com',
  enteredPassword: '12345678',
  enteredConfirmPassword: '12345678',
};

const RegisterScreen: React.FC<IntroSkipButtonProps> = ({navigation}) => {
  const [showPass, setShowPass] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });
  const [userInput, setUserInput] = useState<RegUserInput>(initialUserInput);
  const [userInputErrors, setUserInputErrors] = useState<UserInputErrors>({});

  const {loading, error} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const {isConnected} = useNetInfo();

  const handleUserInputChange = (field: keyof RegUserInput, value: string) => {
    const updatedInput = {...userInput, [field]: value};
    setUserInput(updatedInput);
    if (userInputErrors[`${field}Error`]) {
      setUserInputErrors((prevInputError: UserInputErrors) => ({
        ...prevInputError,
        [`${field}Error`]: '',
      }));
    }
  };

  const hasValidationError = (validationResult: RegValidationResult) => {
    return (
      validationResult.nameError ||
      validationResult.emailError ||
      validationResult.passwordError ||
      validationResult.confirmPasswordError
    );
  };

  const setValidationErrors = (validationResult: RegValidationResult) => {
    setUserInputErrors({
      enteredNameError: validationResult.nameError,
      enteredEmailError: validationResult.emailError,
      enteredPasswordError: validationResult.passwordError,
      enteredConfirmPasswordError: validationResult.confirmPasswordError,
    });
  };

  const resetValidationErrors = () => {
    setUserInputErrors({
      enteredNameError: '',
      enteredEmailError: '',
      enteredPasswordError: '',
      enteredConfirmPasswordError: '',
    });
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!isConnected) {
      showSnack('No Internet Connection', {
        duration: 3000,
        backgroundColor: colors.deepRed,
        textColor: colors.white,
        actionText: 'Okay',
        actionColor: colors.white,
      });

      return;
    }

    const {enteredName, enteredEmail, enteredPassword, enteredConfirmPassword} =
      userInput;

    const validationResult = createAccountValidation(
      enteredName,
      enteredEmail,
      enteredPassword,
      enteredConfirmPassword,
    );

    const validationError = hasValidationError(validationResult);

    if (validationError) {
      setValidationErrors(validationResult);
      return;
    } else {
      resetValidationErrors();
    }

    try {
      await dispatch(
        registerUser({
          email: enteredEmail,
          password: enteredPassword,
          displayName: enteredName,
        }),
      ).unwrap();

      accountCreatedAlert(navigation);
    } catch (error: any) {
      Alert.alert('Login Failed', error);
    }
  };

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
                  value={userInput.enteredName}
                  onChange={val => handleUserInputChange('enteredName', val)}
                  error={userInputErrors.enteredNameError}
                />
                <IconButton
                  iconName="person-outline"
                  iconSize={18}
                  iconColor={colors.iconColor}
                  activeOpacity={1}
                />
              </View>
              <View>
                {userInputErrors.enteredNameError && (
                  <AnimatedErrorText
                    errorText={userInputErrors.enteredNameError}
                    color={colors.deepRed}
                  />
                )}
              </View>

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
                  secureTextEntry={!showPass.password}
                  value={userInput.enteredPassword}
                  onChange={val =>
                    handleUserInputChange('enteredPassword', val)
                  }
                  error={userInputErrors.enteredPasswordError}
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
                {userInputErrors.enteredPasswordError && (
                  <AnimatedErrorText
                    errorText={userInputErrors.enteredPasswordError}
                    color={colors.deepRed}
                  />
                )}
              </View>

              <View>
                <InputLocal
                  placeholder="Enter your confirm password"
                  textColor={colors.inputTextColor}
                  secureTextEntry={!showPass.confirmPassword}
                  value={userInput.enteredConfirmPassword}
                  onChange={val =>
                    handleUserInputChange('enteredConfirmPassword', val)
                  }
                  error={userInputErrors.enteredConfirmPasswordError}
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
              <View>
                {userInputErrors.enteredConfirmPasswordError && (
                  <AnimatedErrorText
                    errorText={userInputErrors.enteredConfirmPasswordError}
                    color={colors.deepRed}
                  />
                )}
              </View>

              <ButtonLocal
                title="Sign up"
                loading={loading}
                buttonStyle={{backgroundColor: colors.primaryGreen}}
                onPressHandler={handleSubmit}
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
