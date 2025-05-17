import React, {useEffect, useState} from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {staticColors} from '../../constants/colors';
import {useTheme} from '../../hooks/useTheme';
import {useTranslation} from '../../i18n/useTranslations';
import {setThemeMode} from '../../redux/slices/themeSlice';
import styles from '../../styles/ThemeToggle.styles';
import {
  ThemeOption,
  ThemeOptionItem,
  ThemeToggleProps,
} from '../../types/Common/ThemeToggle.type';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({containerStyle}) => {
  const dispatch = useDispatch();
  const {isDarkMode, themeMode, colors} = useTheme();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  const {t} = useTranslation();

  const themeOptions: ThemeOptionItem[] = [
    {value: 'auto', label: t('settings.system'), icon: 'monitor'},
    {value: 'dark', label: t('settings.dark'), icon: 'moon'},
    {value: 'light', label: t('settings.light'), icon: 'sun'},
  ];

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();

    return () => {
      slideAnim.setValue(0);
    };
  }, [isDarkMode]);

  const getCurrentThemeLabel = () => {
    const currentOption = themeOptions.find(
      option => option.value === themeMode,
    );
    return currentOption ? currentOption.label : 'System';
  };

  const getCurrentThemeIcon = () => {
    if (themeMode === 'auto') {
      return 'monitor';
    }
    return isDarkMode ? 'moon' : 'sun';
  };

  const handleThemeChange = (option: ThemeOption) => {
    dispatch(setThemeMode(option));
    setDropdownVisible(false);
  };

  const backgroundColorInterpolation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.themeCard || colors.themeCard, colors.themeCard],
  });

  const showStatusbar =
    (themeMode === 'light' || !isDarkMode) && dropdownVisible;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: backgroundColorInterpolation,
        },
        containerStyle,
      ]}>
      {showStatusbar && (
        <StatusBar backgroundColor={staticColors.modalBackdrop} />
      )}

      <View style={styles.cardHeader}>
        <View>
          <Text
            style={[
              styles.title,
              {
                color: colors.backgroundMenu,
              },
            ]}>
            {t('settings.appearance')}
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: colors.gray300,
              },
            ]}>
            {t('settings.themeMode')}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.dropdownButton,
          {
            backgroundColor: colors.backgroundInput,
          },
        ]}
        onPress={() => setDropdownVisible(true)}
        activeOpacity={0.7}>
        <View style={styles.selectedOption}>
          <Feather
            name={getCurrentThemeIcon()}
            size={18}
            color={colors.textPrimary}
            style={styles.icon}
          />
          <Text
            style={[
              styles.selectedText,
              {
                color: colors.textPrimary,
              },
            ]}>
            {getCurrentThemeLabel()}
          </Text>
        </View>
        <Feather name="chevron-down" size={20} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.themePreview}>
        <View
          style={[
            styles.previewCard,
            {
              backgroundColor: colors.white,
              opacity: isDarkMode ? 0.7 : 1,
              elevation: 4,
            },
          ]}>
          <View style={styles.previewHeader} />
          <View style={styles.previewContent}>
            <View style={[styles.lightPreviewLine, {width: '70%'}]} />
            <View style={[styles.lightPreviewLine, {width: '90%'}]} />
            <View style={[styles.lightPreviewLine, {width: '60%'}]} />
          </View>
        </View>
        <View
          style={[
            styles.previewCard,
            {
              backgroundColor: staticColors.cardBackground,
              opacity: isDarkMode ? 1 : 0.7,
              elevation: 4,
            },
          ]}>
          <View style={styles.darkPreviewHeader} />
          <View style={styles.previewContent}>
            <View style={[styles.darkPreviewLine, {width: '70%'}]} />
            <View style={[styles.darkPreviewLine, {width: '90%'}]} />
            <View style={[styles.darkPreviewLine, {width: '60%'}]} />
          </View>
        </View>
      </View>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}>
          <View
            style={[
              styles.dropdownMenu,
              {
                backgroundColor: colors.themeCard,
              },
            ]}>
            {themeOptions.map((option, index) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.dropdownItem,
                  themeMode === option.value && {
                    backgroundColor: colors.activeThemeBg,
                  },
                  index === themeOptions.length - 1 && styles.noBottomBorder,
                ]}
                onPress={() => handleThemeChange(option.value)}>
                <Feather
                  name={option.icon}
                  size={18}
                  color={
                    themeMode === option.value
                      ? colors.accentCircle
                      : colors.textPrimary
                  }
                  style={styles.icon}
                />
                <Text
                  style={[
                    styles.dropdownItemText,
                    themeMode === option.value
                      ? {
                          color: colors.accentCircle,
                        }
                      : {
                          color: colors.textPrimary,
                        },
                  ]}>
                  {option.label}
                </Text>
                {themeMode === option.value && (
                  <Feather
                    name="check"
                    size={18}
                    color={colors.accentCircle}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </Animated.View>
  );
};
