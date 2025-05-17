import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {colors} from '../../constants/colors';
import {useTranslation} from '../../i18n/useTranslations';
import {AppDispatch} from '../../redux/store/store';
import {logoutUser} from '../../redux/thunks/authThunks';
import styles from '../../styles/logoutButtonStyle';
import {showSnack} from '../../utils/Snack';
import BottomSheet from '../Common/BottomSheet';

type LogoutButtonProps = {
  showSheet: boolean;
  setShowSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogoutButton = ({setShowSheet, showSheet}: LogoutButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {t} = useTranslation();

  const logoutHandler = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setTimeout(() => {
        showSnack('Logged out successfully', {
          duration: 3000,
          backgroundColor: colors.background,
          textColor: colors.white,
          actionText: 'Okay',
          actionColor: colors.circle,
        });
      }, 100);
    } catch (error) {
      showSnack('Logout failed', {
        duration: 3000,
        backgroundColor: colors.btnRed,
        textColor: colors.white,
      });
    }
  };

  const toggleBottomSheet = () => {
    setShowSheet(prev => !prev);
  };

  return (
    <View>
      <BottomSheet visible={showSheet} onClose={toggleBottomSheet}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetHeader}>
            <View style={styles.bottomSheetHeaderTextContainer}>
              <Text style={styles.bottomSheetTitle}>
                {t('settings.logout')}
              </Text>
              <Text style={styles.bottomSheetSubtitle}>
                {t('settings.logoutConfirmation')}
              </Text>
            </View>
            <View>
              <Ionicons
                name="close-outline"
                size={26}
                color={colors.muted}
                onPress={toggleBottomSheet}
              />
            </View>
          </View>

          <View style={styles.bottomSheetSpacer} />

          <View style={styles.bottomSheetButtonContainer}>
            <TouchableOpacity
              style={[styles.bottomSheetCancelButton]}
              onPress={toggleBottomSheet}>
              <Text style={styles.bottomSheetCancelText}>
                {t('settings.cancel')}
              </Text>
            </TouchableOpacity>
            <View />
            <TouchableOpacity
              style={styles.bottomSheetLogoutButton}
              onPress={logoutHandler}>
              <Text style={styles.bottomSheetLogoutText}>
                {t('settings.confirmLogout')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default LogoutButton;
