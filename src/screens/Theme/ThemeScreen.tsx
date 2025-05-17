import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import Header from '../../components/Common/Header';
import {ThemeToggle} from '../../components/Common/ThemeToggle';
import {useTheme} from '../../hooks/useTheme';
import {useTranslation} from '../../i18n/useTranslations';
import {RootStackParamList} from '../../types/types';

const ThemeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View
      style={{
        backgroundColor: colors.backgroundDefault,
        flex: 1,
      }}>
      <Header
        title={t('settings.themeSettings')}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        useSafeArea={true}
        backgroundColor={colors.backgroundDefault}
        color={colors.textPrimary}
      />
      <View>
        <ThemeToggle />
      </View>
    </View>
  );
};

export default ThemeScreen;
