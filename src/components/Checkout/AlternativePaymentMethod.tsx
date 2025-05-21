import {Text, View} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import styles from '../../styles/Checkout/AlternativePaymentMethod.styles';

interface AlternativePaymentMethodProps {
  method: string;
}

const AlternativePaymentMethod: React.FC<AlternativePaymentMethodProps> = ({
  method,
}) => {
  const {colors} = useTheme();
  let message = '';

  switch (method) {
    case 'paypal':
      message =
        "You'll be redirected to PayPal to complete your payment securely.";
      break;
    case 'apple_pay':
      message = 'Complete your purchase with Apple Pay.';
      break;
    case 'google_pay':
      message = 'Complete your purchase with Google Pay.';
      break;
    default:
      return null;
  }

  return (
    <View style={[styles.container, {borderColor: colors.gray500}]}>
      <Text style={[styles.text, {color: colors.textPrimary}]}>{message}</Text>
    </View>
  );
};

export default AlternativePaymentMethod;
