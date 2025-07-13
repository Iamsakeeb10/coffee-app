import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePaymentForm} from '../../hooks/usePaymentFrom';
import {useTheme} from '../../hooks/useTheme';
import styles from '../../styles/Checkout/PaymentForm.styles';
import {PaymentFormProps} from '../../types/Checkout/PaymentForm.type';
import {PAYMENT_METHODS} from '../../utils/staticPortion';
import DoubleButton from '../Common/DoubleButton';
import AlternativePaymentMethod from './AlternativePaymentMethod';
import CreditCardForm from './CreditCardForm';
import PaymentMethodSelector from './PaymentMethodSelector';

const PaymentForm = ({
  onSubmit,
  goBack,
  setIsDirty,
  currentStep,
}: PaymentFormProps) => {
  const {colors} = useTheme();
  const {
    selectedPaymentMethod,
    form,
    isProcessing,
    saveCard,
    setSaveCard,
    isKeyboardVisible,
    formErrors,
    handlePaymentMethodSelect,
    handleChange,
    handleSubmit,
    detectCardType,
  } = usePaymentForm(onSubmit, setIsDirty, currentStep);

  const cardType = detectCardType(form.cardNumber);
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={64}>
      <View
        style={[styles.container, {backgroundColor: colors.backgroundDefault}]}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 24}}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets>
          <PaymentMethodSelector
            selectedPaymentMethod={selectedPaymentMethod}
            onSelect={handlePaymentMethodSelect}
          />
          {/* Credit Card Form */}
          {selectedPaymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
            <CreditCardForm
              form={form}
              cardType={cardType}
              onChange={handleChange}
              saveCard={saveCard}
              onToggleSaveCard={() => setSaveCard(!saveCard)}
              errors={formErrors}
            />
          )}

          {selectedPaymentMethod === PAYMENT_METHODS.PAYPAL && (
            <AlternativePaymentMethod method={PAYMENT_METHODS.PAYPAL} />
          )}
          {selectedPaymentMethod === PAYMENT_METHODS.APPLE_PAY && (
            <AlternativePaymentMethod method={PAYMENT_METHODS.APPLE_PAY} />
          )}
          {selectedPaymentMethod === PAYMENT_METHODS.GOOGLE_PAY && (
            <AlternativePaymentMethod method={PAYMENT_METHODS.GOOGLE_PAY} />
          )}
        </ScrollView>

        <View style={styles.buttonContainer}>
          {!isKeyboardVisible && (
            <View style={{flexDirection: 'row', gap: 10}}>
              <DoubleButton
                title="Go Back"
                loading={false}
                backgroundColor={colors.accentBadge}
                onPressHandler={() => goBack()}
                isDouble
              />
              <DoubleButton
                title="Continue to Review"
                loading={isProcessing}
                backgroundColor={colors.accentBadge}
                onPressHandler={handleSubmit}
                isDouble
              />
            </View>
          )}

          <View
            style={[
              styles.securityRow,
              {
                paddingBottom: insets.bottom,
              },
            ]}>
            <Text style={[styles.securityText, {color: colors.stepLabel}]}>
              🔒 Your payment information is secure.
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PaymentForm;
