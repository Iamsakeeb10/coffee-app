import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {PaymentFormData} from '../types/Checkout/PaymentForm.type';
import {PAYMENT_METHODS} from '../utils/staticPortion';
import {validatePaymentForm} from '../utils/validator';

export const usePaymentForm = (onSubmit: (form: PaymentFormData) => void) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PAYMENT_METHODS.CREDIT_CARD,
  );
  const [form, setForm] = useState<PaymentFormData>({
    cardNumber: '5668568868558855',
    expirationDate: '12/28',
    cvv: '393494',
    cardholderName: 'Shakib',
    paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
  });
  // const [form, setForm] = useState<PaymentFormData>({
  //   cardNumber: '',
  //   expirationDate: '',
  //   cvv: '',
  //   cardholderName: '',
  //   paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
  // });
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted.substring(0, 19);
  };

  const formatExpirationDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
    if (/^3[47]/.test(cleaned)) return 'Amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
    return '';
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    setForm(prev => ({...prev, paymentMethod: method}));
  };

  const handleChange = (key: keyof PaymentFormData, value: string) => {
    let formattedValue = value;

    if (key === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (key === 'expirationDate') {
      formattedValue = formatExpirationDate(value);
    } else if (key === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setForm(prev => ({...prev, [key]: formattedValue}));
  };

  const handleSubmit = () => {
    const errors = validatePaymentForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSubmit(form);
    }, 1500);
  };

  return {
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
  };
};
