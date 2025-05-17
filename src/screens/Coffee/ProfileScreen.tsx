import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import LogoutButton from '../../components/Coffee/LogoutButton';
import ProfileImage from '../../components/Coffee/ProfileImage';
import Header from '../../components/Common/Header';
import LanguageBottomSheet from '../../components/Profile/LanguageBottomSheet';
import {colors} from '../../constants/colors';
import {useTranslation} from '../../i18n/useTranslations';
import {RootState} from '../../redux/store/store';
import styles from '../../styles/profileScreenStyles';
import {RootStackParamList} from '../../types/types';

const ProfileScreen = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [languageSheetVisible, setLanguageSheetVisible] = useState(false);

  const {user} = useSelector((state: RootState) => state.auth);
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const menuItems = [
    {
      icon: 'globe-outline',
      title: t('profile.language.label'),
      key: 'language',
    },
    {icon: 'log-out-outline', title: t('profile.logout.button'), key: 'logout'},
    {icon: '', title: ''},
    {icon: '', title: ''},
    {icon: '', title: ''},
  ];

  const toggleBottomSheet = () => {
    setShowSheet(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('profile.header.title')}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        useSafeArea={true}
        backgroundColor={colors.background}
        color={colors.textPrimary}
      />

      <View style={styles.profileCard}>
        <ProfileImage photoURL={user?.photoURL} />
        <Text style={styles.name}>{user?.displayName}</Text>
        <Text style={styles.phone}>{user?.email}</Text>
      </View>
      <LogoutButton showSheet={showSheet} setShowSheet={setShowSheet} />

      <View style={styles.menuContainer}>
        <Text style={styles.accountText}>{t('profile.account.overview')}</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              switch (item.key) {
                case 'logout':
                  toggleBottomSheet();
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
              },
            ]}>
            <View
              style={[
                styles.menuIconWrap,
                {backgroundColor: item.icon ? colors.menuIcon : 'transparent'},
              ]}>
              <Ionicons name={item.icon} size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons
              name={item.icon ? 'chevron-forward' : ''}
              size={20}
              color={colors.skeletonBackground}
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
