import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  onPress: () => void;
  style?: ViewStyle;
  backgroundColor?: string;
  iconColor?: string;
  textColor?: string;
}

const LocationPickerButton: React.FC<Props> = ({
  onPress,
  style,
  backgroundColor = '#FF7F50', // fallback if no color provided
  iconColor = '#FFFFFF',
  textColor = '#FFFFFF',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor}, style]}>
      <Ionicons name="location-outline" size={20} color={iconColor} />
      <Text style={[styles.text, {color: textColor}]}>
        Use Current Location or Pick from Map
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 15,
  },
  text: {
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default LocationPickerButton;
