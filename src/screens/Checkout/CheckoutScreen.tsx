import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing as RNEasing,
  StyleSheet,
  View,
} from 'react-native';

import ShippingForm from '../../components/Checkout/ShippingForm';
import Header from '../../components/Common/Header';
import {useTheme} from '../../hooks/useTheme';
import {PaymentFormData} from '../../types/Checkout/PaymentForm.type';
import {ShippingFormData} from '../../types/Checkout/ShippingForm.type';
import {RootStackParamList} from '../../types/types';

const {width} = Dimensions.get('window');

const CheckoutScreen = () => {
  const {colors} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [shippingData, setShippingData] = useState<ShippingFormData | null>(
    null,
  );
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);
  const [step, setStep] = useState(1);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const slideToStep = (targetStep: number) => {
    Animated.timing(animatedValue, {
      toValue: targetStep - 1,
      duration: 400,
      easing: RNEasing.bezier(0.25, 0.1, 0.25, 1), // smoother
      useNativeDriver: false,
    }).start(() => {
      setStep(targetStep);
    });
  };

  const goNext = () => {
    if (step < 3) {
      slideToStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      slideToStep(step - 1);
    }
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -width, -2 * width],
  });

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundDefault}}>
      <Header
        title="Checkout"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        useSafeArea={false}
        backgroundColor={colors.backgroundDefault}
        color={colors.textPrimary}
      />

      <Animated.View
        style={[styles.sliderContainer, {transform: [{translateX}]}]}>
        <View style={styles.stepContainer}>
          <ShippingForm
            onSubmit={data => {
              setShippingData(data);
              goNext();
            }}
          />
        </View>
        <View style={styles.stepContainer}>
          {/* <PaymentForm
            onSubmit={data => {
              setPaymentData(data);
              goNext();
            }}
            goBack={goBack}
          /> */}
        </View>
        <View style={styles.stepContainer}>{/* <OrderReview /> */}</View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row',
    width: width * 3,
    flex: 1,
  },
  stepContainer: {
    width: width,
  },
});

export default CheckoutScreen;
