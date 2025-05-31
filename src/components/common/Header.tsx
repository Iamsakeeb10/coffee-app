import React from 'react';
import {Platform, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {useTheme} from '../../hooks/useTheme';
import styles from '../../styles/Header.styles';
import {HeaderProps} from '../../types/Common/HeaderProps.type';
// import {colors} from '../../constants/colors';

const Header = ({
  title,
  onBackPress,
  showBack = false,
  leftComponent,
  rightComponent,
  leftIconName = 'chevron-back',
  rightIconName,
  onRightPress,
  headerStyle,
  titleStyle,
  backgroundColor,
  color,
  useSafeArea = true,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();

  const {isDarkMode} = useTheme();

  const renderLeftContent = () => {
    if (leftComponent) {
      return leftComponent;
    }

    if (showBack) {
      return (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onBackPress}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Ionicons
            name={leftIconName}
            size={24}
            color={color || colors.white}
          />
        </TouchableOpacity>
      );
    }

    return <View style={styles.iconPlaceholder} />;
  };

  const renderRightContent = () => {
    if (rightComponent) {
      return rightComponent;
    }

    if (rightIconName) {
      return (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onRightPress}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Ionicons name={rightIconName} size={24} color={color} />
        </TouchableOpacity>
      );
    }

    return <View style={styles.iconPlaceholder} />;
  };

  const topPadding = useSafeArea
    ? Platform.OS === 'android'
      ? StatusBar.currentHeight || 10
      : insets.top
    : 10;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor || colors.background,
          paddingTop: topPadding,
          paddingBottom: 16,
          elevation: isDarkMode ? 0 : 8,
        },
        headerStyle,
      ]}>
      <View style={styles.headerContent}>
        <View style={styles.leftContainer}>{renderLeftContent()}</View>

        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color}, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View style={styles.rightContainer}>{renderRightContent()}</View>
      </View>
    </View>
  );
};

export default Header;
