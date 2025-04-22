import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IconButtonProps {
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  activeOpacity?: number;
  iconStyle?: ViewStyle;
  children?: React.ReactNode;
}

const IconButtonImage: React.FC<IconButtonProps> = ({
  iconName,
  iconSize = 18,
  iconColor = '#fff',
  onPress,
  style,
  activeOpacity = 0.6,
  iconStyle,
  children,
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
      {children ? (
        <View style={{flex: 1}}>{children}</View>
      ) : (
        <Ionicons
          name={iconName || 'alert-circle'}
          size={iconSize}
          color={iconColor}
          style={[styles.iconStyle, iconStyle]}
        />
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    width: 40,
    height: 40,
  },
});

export default IconButtonImage;
