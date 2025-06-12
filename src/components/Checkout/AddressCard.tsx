import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../hooks/useTheme';
import {fontFamily} from '../../utils/typography';

interface AddressCardProps {
  name: string;
  phone: string;
  street: string;
  city: string;
}

const AddressCard: React.FC<AddressCardProps> = ({
  name,
  phone,
  street,
  city,
}) => {
  const {colors, isDarkMode} = useTheme();

  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.title, {color: colors.textPrimary}]}>
        Delivery Address
      </Text>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundCard,
            borderWidth: !isDarkMode ? 1 : 0,
          },
        ]}>
        <Ionicons name="home-outline" size={20} color={colors.textPrimary} />
        <View style={styles.textContainer}>
          <Text style={[styles.name, {color: colors.textPrimary}]}>{name}</Text>
          <Text style={[styles.text, {color: colors.textPrimary}]}>
            {phone}
          </Text>
          <Text style={[styles.text, {color: colors.textPrimary}]}>
            {street}
          </Text>
          <Text style={[styles.text, {color: colors.textPrimary}]}>{city}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 16,
  },

  title: {
    fontSize: 17,
    fontFamily: fontFamily.medium,
    marginBottom: 12,
  },

  container: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  textContainer: {
    flexShrink: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    marginBottom: 6,
  },
  text: {
    fontSize: 15,
    marginBottom: 2,
    fontFamily: fontFamily.regular,
  },
});

export default AddressCard;
