import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IconButtonProps {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  activeOpacity?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  iconSize = 18,
  iconColor = '#fff',
  onPress,
  style,
  activeOpacity = 0.6,
}) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      style={[styles.iconContainerStyle, style]}
      activeOpacity={activeOpacity}
      onPress={e => {
        e.preventDefault();
        e.stopPropagation();
        if (onPress) onPress(e);
      }}>
      <Ionicons
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles.iconStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    position: 'absolute',
    top: 10,
    right: 11,
  },

  iconContainerStyle: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
    height: 40,
    width: 40,
  },
});

export default IconButton;
