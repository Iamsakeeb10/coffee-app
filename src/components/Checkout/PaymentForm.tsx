import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {PAYMENT_METHODS} from '../../constants/staticPortions';
import {usePaymentForm} from '../../hooks/usePaymentFrom';
import {useTheme} from '../../hooks/useTheme';
import styles from '../../styles/Checkout/PaymentForm.styles';
import {PaymentFormProps} from '../../types/Checkout/PaymentForm.type';
import ButtonLocal from '../Common/ButtonLocal';
import AlternativePaymentMethod from './AlternativePaymentMethod';
import CreditCardForm from './CreditCardForm';
import PaymentMethodSelector from './PaymentMethodSelector';

const PaymentForm = ({onSubmit, goBack}: PaymentFormProps) => {
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
  } = usePaymentForm(onSubmit);

  const cardType = detectCardType(form.cardNumber);

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
              <ButtonLocal
                title="Go Back"
                loading={false}
                backgroundColor={colors.accentBadge}
                onPressHandler={() => goBack()}
                isDouble
              />
              <ButtonLocal
                title="Continue to Review"
                loading={isProcessing}
                backgroundColor={colors.accentBadge}
                onPressHandler={handleSubmit}
                isDouble
              />
            </View>
          )}

          <View style={styles.securityRow}>
            <Text style={[styles.securityText, {color: colors.textSecondary}]}>
              🔒 Your payment information is secure.
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PaymentForm;
