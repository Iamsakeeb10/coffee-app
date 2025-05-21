import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import styles from '../../styles/Checkout/CreditCardForm.styles';
import {CreditCardFormProps} from '../../types/Checkout/CreditCardForm.type';
import InputLocal from '../Auth/InputLocal';
import AnimatedErrorText from '../Common/AnimatedErrorText';

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  form,
  cardType,
  onChange,
  saveCard,
  onToggleSaveCard,
  errors,
}) => {
  const {colors} = useTheme();

  return (
    <>
      <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>
        Card Information
      </Text>

      <InputLocal
        placeholder="Cardholder Name"
        value={form.cardholderName}
        onChange={text => onChange('cardholderName', text)}
        error={errors?.cardholderName}
        customStyle={[
          styles.input,
          {
            backgroundColor: colors.backgroundDefault,
            borderColor: colors.gray500,
          },
        ]}
      />
      {errors?.cardholderName && (
        <AnimatedErrorText
          errorText={errors.cardholderName}
          color={colors.accentOrange}
        />
      )}

      <View style={styles.cardNumberContainer}>
        <InputLocal
          placeholder="Card Number"
          value={form.cardNumber}
          onChange={text => onChange('cardNumber', text)}
          error={errors?.cardNumber}
          keyboardType="numeric"
          customStyle={[
            styles.input,
            {
              backgroundColor: colors.backgroundDefault,
              borderColor: colors.gray500,
            },
          ]}
        />
        {cardType ? <Text style={styles.cardType}>{cardType}</Text> : null}
      </View>
      {errors?.cardNumber && (
        <AnimatedErrorText
          errorText={errors.cardNumber}
          color={colors.accentOrange}
        />
      )}

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <InputLocal
            placeholder="Expiration (MM/YY)"
            value={form.expirationDate}
            onChange={text => onChange('expirationDate', text)}
            error={errors?.expirationDate}
            keyboardType="numeric"
            customStyle={[
              styles.input,
              {
                backgroundColor: colors.backgroundDefault,
                borderColor: colors.gray500,
              },
            ]}
          />
          {errors?.expirationDate && (
            <AnimatedErrorText
              errorText={errors.expirationDate}
              color={colors.accentOrange}
            />
          )}
        </View>
        <View style={styles.halfWidth}>
          <InputLocal
            placeholder="CVV"
            value={form.cvv}
            onChange={text => onChange('cvv', text)}
            error={errors?.cvv}
            keyboardType="numeric"
            customStyle={[
              styles.input,
              {
                backgroundColor: colors.backgroundDefault,
                borderColor: colors.gray500,
              },
            ]}
          />
          {errors?.cvv && (
            <AnimatedErrorText
              errorText={errors.cvv}
              color={colors.accentOrange}
            />
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.saveCardRow} onPress={onToggleSaveCard}>
        <View
          style={[
            styles.checkbox,
            {
              borderColor: colors.gray500,
              backgroundColor: saveCard ? colors.accentBadge : 'transparent',
            },
          ]}>
          {saveCard && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.saveCardText, {color: colors.textSecondary}]}>
          Save card for future payments
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CreditCardForm;
