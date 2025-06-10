import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import styles from '../../styles/Checkout/PaymentMethodSelector.styles';
import {PAYMENT_METHODS} from '../../utils/staticPortion';

interface PaymentMethodSelectorProps {
  selectedPaymentMethod: string;
  onSelect: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedPaymentMethod,
  onSelect,
}) => {
  const {colors} = useTheme();

  const renderPaymentMethodIcon = (method: string, isActive: boolean) => {
    const activeTextColor = isActive
      ? colors.accentBadge
      : colors.backgroundFavorite;

    switch (method) {
      case PAYMENT_METHODS.CREDIT_CARD:
        return (
          <View style={styles.paymentIconContainer}>
            <Text style={[styles.paymentIconText, {color: colors.gray500}]}>
              💳
            </Text>
            <Text
              style={{
                color: activeTextColor,
                fontSize: 12,
                textAlign: 'center',
              }}>
              Credit Card
            </Text>
          </View>
        );
      case PAYMENT_METHODS.PAYPAL:
        return (
          <View style={styles.paymentIconContainer}>
            <Text style={[styles.paymentIconText, {color: colors.accentBadge}]}>
              P
            </Text>
            <Text style={{color: activeTextColor, fontSize: 12}}>PayPal</Text>
          </View>
        );
      case PAYMENT_METHODS.APPLE_PAY:
        return (
          <View style={styles.paymentIconContainer}>
            <Text style={[styles.paymentIconText, {color: colors.gray300}]}>
              🍎
            </Text>
            <Text style={{color: activeTextColor, fontSize: 12}}>
              Apple Pay
            </Text>
          </View>
        );
      case PAYMENT_METHODS.GOOGLE_PAY:
        return (
          <View style={styles.paymentIconContainer}>
            <Text
              style={[
                styles.paymentIconText,
                {color: colors.paymentMethodText},
              ]}>
              G
            </Text>
            <Text
              style={{
                color: activeTextColor,
                fontSize: 12,
                textAlign: 'center',
              }}>
              Google Pay
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View>
      <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>
        Payment Method
      </Text>
      <FlatList
        data={Object.values(PAYMENT_METHODS)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={styles.paymentMethodsContainer}
        ItemSeparatorComponent={() => <View style={{width: 12}} />}
        renderItem={({item: method}) => {
          const isActive = selectedPaymentMethod === method;
          return (
            <TouchableOpacity
              style={[
                styles.paymentMethodCard,
                {
                  borderColor: isActive ? colors.accentBadge : colors.gray400,
                  backgroundColor: isActive
                    ? colors.backgroundFavorite
                    : colors.backgroundDefault,
                },
              ]}
              onPress={() => onSelect(method)}>
              {renderPaymentMethodIcon(method, isActive)}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default PaymentMethodSelector;
