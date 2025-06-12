import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../hooks/useTheme';

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
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundCard}]}>
      <Ionicons name="home-outline" size={20} color={colors.white} />
      <View style={styles.textContainer}>
        <Text style={[styles.name, {color: colors.white}]}>{name}</Text>
        <Text style={[styles.text, {color: colors.white}]}>{phone}</Text>
        <Text style={[styles.text, {color: colors.white}]}>{street}</Text>
        <Text style={[styles.text, {color: colors.white}]}>{city}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
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
    fontWeight: 'bold',
    marginBottom: 6,
  },
  text: {
    fontSize: 15,
    marginBottom: 2,
  },
});

export default AddressCard;
