import {getAuth, sendPasswordResetEmail} from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  Alert,
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
import LinearGradient from 'react-native-linear-gradient';

import {getApp} from '@react-native-firebase/app';
import AnimatedErrorText from '../../components/Auth/AnimatedErrorText';
import ButtonLocal from '../../components/Common/ButtonLocal';
import CustomAlert from '../../components/Common/CustomAlert';
import IconButton from '../../components/Common/IconButton';
import InputLocal from '../../components/Common/InputLocal';
import {colors} from '../../constants/colors';
import useNetInfo from '../../hooks/useNetInfo';
import {useTranslation} from '../../i18n/useTranslations';
import styles from '../../styles/authStyles';
import {
  ForgetPassInput,
  ForgetPasswordInput,
  ForgetPasswordValidationResult,
  IntroSkipButtonProps,
} from '../../types/types';
import {showSnack} from '../../utils/Snack';

const initialUserInput: ForgetPasswordInput = {
  enteredEmail: 'test@mail.com',
};

const ForgetPasswordScreen: React.FC<IntroSkipButtonProps> = ({navigation}) => {
  const [userInput, setUserInput] =
    useState<ForgetPasswordInput>(initialUserInput);
  const [userInputErrors, setUserInputErrors] = useState<ForgetPassInput>({
    enteredEmailError: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResetAlert, setShowResetAlert] = useState(false);

  const {isConnected} = useNetInfo();
  const {t} = useTranslation();

  const handleUserInputChange = (
    field: keyof ForgetPasswordInput,
    value: string,
  ) => {
    const updatedInput = {...userInput, [field]: value};
    setUserInput(updatedInput);
    if (userInputErrors[`${field}Error`]) {
      setUserInputErrors((prevInputError: ForgetPassInput) => ({
        ...prevInputError,
        [`${field}Error`]: '',
      }));
    }
  };

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForgetPasswordInput = (
    email: string,
    t: (key: string) => string,
  ): ForgetPasswordValidationResult => {
    let emailError = '';

    if (!email) {
      emailError = t('auth.emailRequired');
    } else if (!isValidEmail(email)) {
      emailError = t('auth.invalidEmail');
    }

    return {
      emailError,
    };
  };

  const hasValidationError = (
    validationResult: ForgetPasswordValidationResult,
  ) => {
    return validationResult.emailError;
  };

  const setValidationErrors = (
    validationResult: ForgetPasswordValidationResult,
  ) => {
    setUserInputErrors({
      enteredEmailError: validationResult.emailError || '',
    });
  };

  const resetValidationErrors = () => {
    setUserInputErrors({
      enteredEmailError: '',
    });
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!isConnected) {
      showSnack(`${t('auth.noInternetConnection')}`, {
        duration: 3000,
        backgroundColor: colors.deepRed,
        textColor: colors.white,
        actionText: t('common.okay'),
        actionColor: colors.white,
      });
      return;
    }

    const {enteredEmail} = userInput;

    const validationResult = validateForgetPasswordInput(enteredEmail, t);
    const validationError = hasValidationError(validationResult);

    if (validationError) {
      setValidationErrors(validationResult);
      return;
    } else {
      resetValidationErrors();
    }

    setIsLoading(true);

    try {
      const auth = getAuth(getApp()); // 🔄 new way
      await sendPasswordResetEmail(auth, enteredEmail); // 🔄 modular API

      setShowResetAlert(true);
    } catch (error: any) {
      console.log('Forget error =>> ', error);
      if (error.code === 'auth/user-not-found') {
        showSnack(t('auth.emailNotRegistered'), {
          duration: 3000,
          backgroundColor: colors.deepRed,
          textColor: colors.white,
          actionText: t('common.okay'),
          actionColor: colors.white,
        });
      } else {
        Alert.alert(
          t('auth.resetPasswordFailed'),
          error.message || error.toString(),
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/forget-3.jpg')}
      style={styles.fullWidth}
      resizeMode="cover"
      blurRadius={10}>
      <LinearGradient
        colors={[colors.linearGradientStart, colors.linearGradientEnd]}
        style={styles.fullWidth}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <View style={styles.safeAreaContainer}>
          <ScrollView
            keyboardShouldPersistTaps={
              Platform.OS === 'android' ? 'handled' : undefined
            }>
            <View style={[styles.headerTextContainer, {marginTop: 0}]}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/images/intro-logo.png')}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.headerText, {textAlign: 'center'}]}>
                {t('auth.forgetPassword')}
              </Text>
              <Text
                style={[
                  styles.headerText,
                  {
                    fontSize: 16,
                    lineHeight: 16.0,
                    marginTop: 8,
                  },
                ]}>
                {t('auth.enterEmailToResetPassword')}
              </Text>
            </View>

            <KeyboardAvoidingView
              behavior="padding"
              style={styles.formContainer}>
              <View>
                <InputLocal
                  placeholder={t('auth.enterEmail')}
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
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                  }}
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

              <ButtonLocal
                title={t('auth.sendResetLink')}
                loading={isLoading}
                buttonStyle={{backgroundColor: colors.forgetBtn}}
                onPressHandler={handleSubmit}
              />

              <View style={styles.bottomContainer}>
                <Text style={styles.alreadySigninText}>
                  {t('auth.rememberPassword')}
                </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={styles.signinText}>{t('auth.backToLogin')}</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </LinearGradient>
      <CustomAlert
        visible={showResetAlert}
        title={t('auth.emailSent')}
        message={t('auth.resetPasswordEmailSent')}
        cancelText={t('auth.cancel')}
        confirmText={t('auth.goToLogin')}
        onCancel={() => setShowResetAlert(false)}
        onConfirm={() => {
          setShowResetAlert(false);
          navigation.navigate('LoginScreen');
        }}
      />
    </ImageBackground>
  );
};

export default ForgetPasswordScreen;
