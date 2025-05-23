import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  BackHandler,
  Dimensions,
  Easing as RNEasing,
} from 'react-native';
import {PaymentFormData} from '../types/Checkout/PaymentForm.type';
import {ShippingFormData} from '../types/Checkout/ShippingForm.type';
import {RootStackParamList} from '../types/types';

const {width} = Dimensions.get('window');

export const useCheckoutNavigation = (
  shippingData: ShippingFormData | null,
  paymentData: PaymentFormData | null,
  isDirty: boolean,
) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [step, setStep] = useState(1);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', e => {
  //     if (!isDirty) return;

  //     e.preventDefault();

  //     Alert.alert(
  //       'Discard changes?',
  //       'You have unsaved changes. Are you sure you want to leave?',
  //       [
  //         {
  //           text: "Don't leave",
  //           style: 'cancel',
  //           onPress: () => {
  //             console.log('this');
  //           },
  //         },
  //         {
  //           text: 'Discard',
  //           style: 'destructive',
  //           onPress: () => navigation.dispatch(e.data.action),
  //         },
  //       ],
  //     );
  //   });

  //   return unsubscribe;
  // }, [navigation, isDirty]);

  const slideToStep = (targetStep: number) => {
    Animated.timing(animatedValue, {
      toValue: targetStep - 1,
      duration: 400,
      easing: RNEasing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: false,
    }).start(() => {
      setStep(targetStep);
    });
  };

  const confirmGoBack = () => {
    Alert.alert(
      'Unsaved Changes',
      'You have entered some information. Going back will discard it. Do you want to proceed?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const headerBackPress = () => {
    handleBackPress();
  };

  const handleBackPress = () => {
    console.log('Step +..', step);
    if (step > 1) {
      slideToStep(step - 1);
    } else {
      console.log(isDirty);
      console.log(step);
      if (shippingData || paymentData || isDirty) {
        confirmGoBack();
      } else {
        navigation.goBack();
      }
    }
    return true;
  };

  const goNext = () => {
    if (step < 3) {
      slideToStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      slideToStep(step - 1);
    } else {
      console.log('this');
      handleBackPress();
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return handleBackPress();
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, [step, navigation, isDirty]),
  );

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -width, -2 * width],
  });

  return {
    step,
    goNext,
    goBack,
    slideToStep,
    translateX,
    animatedValue,
    headerBackPress,
  };
};
