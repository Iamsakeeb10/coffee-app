import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {borderRadius} from '../../constants/borderRadius';
import {fontSizes} from '../../constants/fontSizes';
import {spacing} from '../../constants/spacing';
import {useTheme} from '../../hooks/useTheme';
import {fontFamily} from '../../utils/typography';

type DoubleButtonProps = {
  buttonStyle?: object;
  disabled?: boolean;
  textStyle?: object;
  title: string;
  onPressHandler: () => void;
  loading: boolean;
  url?: string;
  loaderColor?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
  backgroundColor?: string;
  isDouble?: boolean;
};

const DoubleButton: React.FC<DoubleButtonProps> = ({
  buttonStyle,
  disabled = false,
  textStyle,
  title,
  onPressHandler,
  loading,
  url,
  loaderColor,
  accessibilityLabel,
  children,
  backgroundColor,
  isDouble,
}) => {
  const {colors} = useTheme();

  const buttonBackgroundColor = backgroundColor || colors.primaryRed;

  const content = (
    <View
      style={[
        styles.container,
        buttonStyle,
        disabled ? styles.disabled : null,
        {
          backgroundColor: buttonBackgroundColor,
        },
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor || colors.white} />
      ) : (
        <>
          {url && (
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={{uri: url}}
            />
          )}
          {children ? (
            children
          ) : (
            <Text style={[styles.buttonText, textStyle, {color: colors.white}]}>
              {title}
            </Text>
          )}
        </>
      )}
    </View>
  );

  if (disabled) {
    return content;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPressHandler}
      disabled={disabled}
      accessibilityState={{disabled}}
      accessibilityLabel={accessibilityLabel || title}
      style={{flex: isDouble ? 1 : 0}}>
      {content}
    </TouchableOpacity>
  );
};

export default DoubleButton;

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.radius3,
    paddingHorizontal: spacing.spacing6,
  },
  buttonText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.font15,
    paddingVertical: spacing.spacing6,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: spacing.spacing6,
  },
  disabled: {
    opacity: 0.5,
  },
});
