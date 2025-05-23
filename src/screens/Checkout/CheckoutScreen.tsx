import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, Animated, Dimensions, StyleSheet, View} from 'react-native';

import OrderReview from '../../components/Checkout/OrderReview';
import PaymentForm from '../../components/Checkout/PaymentForm';
import ShippingForm from '../../components/Checkout/ShippingForm';
import Header from '../../components/Common/Header';
import {useCheckoutNavigation} from '../../hooks/useCheckoutNavigation';
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
  const [isDirty, setIsDirty] = useState(false);

  console.log(isDirty);

  const {goNext, goBack, translateX, headerBackPress} = useCheckoutNavigation(
    shippingData,
    paymentData,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (!isDirty) return;

      e.preventDefault();

      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure you want to leave?',
        [
          {text: "Don't leave", style: 'cancel', onPress: () => {}},
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });

    return unsubscribe;
  }, [navigation, isDirty]);

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
