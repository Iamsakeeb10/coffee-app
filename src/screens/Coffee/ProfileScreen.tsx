import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import LogoutButton from '../../components/Coffee/LogoutButton';
import ProfileImage from '../../components/Coffee/ProfileImage';
import Header from '../../components/Common/Header';
import LanguageBottomSheet from '../../components/Profile/LanguageBottomSheet';
import {staticColors} from '../../constants/colors';
import {useTheme} from '../../hooks/useTheme';
import {useTranslation} from '../../i18n/useTranslations';
import {RootState} from '../../redux/store/store';
import styles from '../../styles/profileScreenStyles';
import {RootStackParamList} from '../../types/types';

const {width} = Dimensions.get('window');

const isSmallDevice = width < 360;

const ProfileScreen = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [languageSheetVisible, setLanguageSheetVisible] = useState(false);

  const {user} = useSelector((state: RootState) => state.auth);
  const {t} = useTranslation();
  const {colors, themeMode, isDarkMode} = useTheme();
  const [showUploadSheet, setShowUploadSheet] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const menuItems = [
    {icon: 'moon-outline', title: t('profile.theme.label'), key: 'theme'},
    {
      icon: 'globe-outline',
      title: t('profile.language.label'),
      key: 'language',
    },
    {icon: 'log-out-outline', title: t('profile.logout.button'), key: 'logout'},
    ...(!isSmallDevice ? [{icon: '', title: '', key: ''}] : []),
    {icon: '', title: ''},
  ];

  const toggleBottomSheet = () => {
    setShowSheet(prev => !prev);
  };

  const showStatusbar =
    ((themeMode === 'light' || !isDarkMode) && showSheet) ||
    languageSheetVisible ||
    showUploadSheet;

  const barStyle =
    showSheet || showUploadSheet || languageSheetVisible
      ? 'light-content'
      : isDarkMode
      ? 'light-content'
      : 'dark-content';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundDefault,
        },
      ]}>
      {showStatusbar && (
        <StatusBar
          backgroundColor={staticColors.bottomSheetBackdrop}
          barStyle={barStyle}
        />
      )}

      <Header
        title={t('profile.header.title')}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        useSafeArea={true}
        backgroundColor={colors.backgroundDefault}
        color={colors.textPrimary}
      />

      <View style={styles.profileCard}>
        <ProfileImage
          photoURL={user?.photoURL}
          showSheet={showUploadSheet}
          setShowSheet={setShowUploadSheet}
        />
        <Text
          style={[
            styles.name,
            {
              color: colors.textPrimary,
            },
          ]}>
          {user?.displayName}
        </Text>
        <Text
          style={[
            styles.phone,
            {
              color: colors.iconDefault,
            },
          ]}>
          {user?.email}
        </Text>
      </View>
      <LogoutButton showSheet={showSheet} setShowSheet={setShowSheet} />

      <View
        style={[
          styles.menuContainer,
          {
            backgroundColor: colors.backgroundMenu,
          },
        ]}>
        <Text
          style={[
            styles.accountText,
            {
              color: colors.backgroundDefault,
            },
          ]}>
          {t('profile.account.overview')}
        </Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              switch (item.key) {
                case 'logout':
                  toggleBottomSheet();
                  break;
                case 'theme':
                  navigation.navigate('ThemeScreen');
                  break;
                case 'language':
                  setLanguageSheetVisible(true);
                  break;
                default:
                  return;
              }
            }}
            disabled={!item.icon}
            activeOpacity={0.5}
            style={[
              styles.menuItem,
              {
                borderBottomWidth: item.icon ? 1 : 0,
                borderBottomColor: colors.gray100,
              },
            ]}>
            <View
              style={[
                styles.menuIconWrap,
                {backgroundColor: item.icon ? colors.menuIcon : 'transparent'},
              ]}>
              <Ionicons name={item.icon} size={20} color={staticColors.white} />
            </View>
            <Text style={[styles.menuText, {color: colors.menuItem}]}>
              {item.title}
            </Text>
            <Ionicons
              name={item.icon ? 'chevron-forward' : ''}
              size={20}
              color={colors.menuItem}
              style={{marginLeft: 'auto'}}
            />
          </TouchableOpacity>
        ))}
      </View>
      <LanguageBottomSheet
        visible={languageSheetVisible}
        onClose={() => setLanguageSheetVisible(false)}
      />
    </View>
  );
};

export default ProfileScreen;
