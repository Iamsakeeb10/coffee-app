import React, {useState} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';

import OrderReview from '../../components/Checkout/OrderReview';
import PaymentForm from '../../components/Checkout/PaymentForm';
import ShippingForm from '../../components/Checkout/ShippingForm';
import Header from '../../components/Common/Header';
import StepIndicator from '../../components/Common/StepIndicator';
import {useCheckoutNavigation} from '../../hooks/useCheckoutNavigation';
import {useTheme} from '../../hooks/useTheme';
import {PaymentFormData} from '../../types/Checkout/PaymentForm.type';
import {ShippingFormData} from '../../types/Checkout/ShippingForm.type';

const {width} = Dimensions.get('window');

const CheckoutScreen = () => {
  const {colors} = useTheme();

  const [shippingData, setShippingData] = useState<ShippingFormData | null>(
    null,
  );
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const {
    goNext,
    goBack,
    translateX,
    headerBackPress,
    step: currentStep,
    slideToStep,
  } = useCheckoutNavigation(shippingData, paymentData, isDirty);

  const guardedSlideToStep = (targetStep: number) => {
    if (targetStep < currentStep) {
      // Allow going back without validation
      slideToStep(targetStep);
    } else {
      // Only go forward if current step's form is valid
      if (currentStep === 1 && shippingData) {
        slideToStep(targetStep);
      } else if (currentStep === 2 && paymentData) {
        slideToStep(targetStep);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundDefault}}>
      <Header
        title="Checkout"
        showBack={true}
        onBackPress={headerBackPress}
        useSafeArea={true}
        backgroundColor={colors.backgroundDefault}
        color={colors.textPrimary}
      />

      <StepIndicator
        currentStep={currentStep}
        slideToStep={guardedSlideToStep}
      />

      <Animated.View
        style={[styles.sliderContainer, {transform: [{translateX}]}]}>
        <View style={styles.stepContainer}>
          <ShippingForm
            onSubmit={data => {
              setShippingData(data);
              goNext();
            }}
            setIsDirty={setIsDirty}
          />
        </View>
        <View style={styles.stepContainer}>
          <PaymentForm
            onSubmit={data => {
              setPaymentData(data);
              goNext();
            }}
            goBack={goBack}
            setIsDirty={setIsDirty}
          />
        </View>
        <View style={styles.stepContainer}>
          <OrderReview />
        </View>
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
