import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import styles from '../../styles/Checkout/ShippingForm.styles';
import {
  ShippingFormData,
  ShippingFormProps,
} from '../../types/Checkout/ShippingForm.type';
import {validateShippingForm} from '../../utils/validator';
import AnimatedErrorText from '../Auth/AnimatedErrorText';
import ButtonLocal from '../Common/ButtonLocal';
import InputLocal from '../Common/InputLocal';

const ShippingForm = ({onSubmit, setIsDirty}: ShippingFormProps) => {
  const {colors} = useTheme();

  // const [form, setForm] = useState<ShippingFormData>({
  //   fullName: 'Shakib Ahmed',
  //   address: 'Dhaka',
  //   city: 'Dhaka',
  //   state: 'BD',
  //   postalCode: '4343',
  //   country: 'BD',
  //   phone: '017',
  //   email: 'shakib@gmail.com',
  // });
  const [form, setForm] = useState<ShippingFormData>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
  });

  const navigation = useNavigation();
  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingFormData, string>>
  >({});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  const handleChange = (key: keyof ShippingFormData, value: string) => {
    setForm(prev => ({...prev, [key]: value}));
    setIsDirty(true);

    // Clear error on change
    if (errors[key]) {
      setErrors(prev => ({...prev, [key]: ''}));
    }
  };

  const handleSubmit = () => {
    const newErrors = validateShippingForm(form);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(form);
  };

  const keyboardOffset = Object.keys(errors).length > 0 ? 0 : 64;

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardOffset}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 24}}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets>
          {/* All InputLocal fields */}
          <InputLocal
            placeholder="Full Name"
            value={form.fullName}
            onChange={text => handleChange('fullName', text)}
            error={errors?.fullName}
            customStyle={[
              styles.input,
              {
                backgroundColor: colors.backgroundDefault,
                borderColor: colors.gray500,
              },
            ]}
          />
          {errors?.fullName && (
            <AnimatedErrorText
              errorText={errors?.fullName}
              color={colors.accentOrange}
            />
          )}

          <InputLocal
            placeholder="Full Address"
            value={form.address}
            onChange={text => handleChange('address', text)}
            error={errors?.address}
            customStyle={[
              styles.input,
              {
                backgroundColor: colors.backgroundDefault,
                borderColor: colors.gray500,
              },
            ]}
          />
          {errors?.address && (
            <AnimatedErrorText
              errorText={errors?.address}
              color={colors.accentOrange}
            />
          )}

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputLocal
                placeholder="City"
                value={form.city}
                onChange={text => handleChange('city', text)}
                error={errors?.city}
                customStyle={[
                  styles.halfInput,
                  {
                    backgroundColor: colors.backgroundDefault,
                    borderColor: colors.gray500,
                  },
                ]}
              />
              {errors?.city && (
                <AnimatedErrorText
                  errorText={errors?.city}
                  color={colors.accentOrange}
                />
              )}
            </View>

            <View style={styles.halfWidth}>
              <InputLocal
                placeholder="State"
                value={form.state}
                onChange={text => handleChange('state', text)}
                error={errors?.state}
                customStyle={[
                  styles.halfInput,
                  {
                    backgroundColor: colors.backgroundDefault,
                    borderColor: colors.gray500,
                  },
                ]}
              />
              {errors?.state && (
                <AnimatedErrorText
                  errorText={errors?.state}
                  color={colors.accentOrange}
                />
              )}
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputLocal
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={text => handleChange('postalCode', text)}
                error={errors?.postalCode}
                customStyle={[
                  styles.halfInput,
                  {
                    backgroundColor: colors.backgroundDefault,
                    borderColor: colors.gray500,
                  },
                ]}
              />
              {errors?.postalCode && (
                <AnimatedErrorText
                  errorText={errors?.postalCode}
                  color={colors.accentOrange}
                />
              )}
            </View>

            <View style={styles.halfWidth}>
              <InputLocal
                placeholder="Country"
                value={form.country}
                onChange={text => handleChange('country', text)}
                error={errors?.country}
                customStyle={[
                  styles.halfInput,
                  {
                    backgroundColor: colors.backgroundDefault,
                    borderColor: colors.gray500,
                  },
                ]}
              />
              {errors?.country && (
                <AnimatedErrorText
                  errorText={errors?.country}
                  color={colors.accentOrange}
                />
              )}
            </View>
          </View>

          <InputLocal
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={form.phone}
            onChange={text => handleChange('phone', text)}
            error={errors?.phone}
            customStyle={[
              styles.input,
              {
                backgroundColor: colors.backgroundDefault,
                borderColor: colors.gray500,
              },
            ]}
          />
          {errors?.phone && (
            <AnimatedErrorText
              errorText={errors?.phone}
              color={colors.accentOrange}
            />
          )}

          <InputLocal
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChange={text => handleChange('email', text)}
            error={errors?.email}
            customStyle={[
              styles.input,
              {
                backgroundColor: colors.backgroundDefault,
                borderColor: colors.gray500,
              },
            ]}
          />
          {errors?.email && (
            <AnimatedErrorText
              errorText={errors?.email}
              color={colors.accentOrange}
            />
          )}
        </ScrollView>

        {!isKeyboardVisible && (
          <View>
            <ButtonLocal
              title="Next"
              loading={false}
              buttonStyle={{width: '100%'}}
              backgroundColor={colors.accentBadge}
              onPressHandler={handleSubmit}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ShippingForm;
