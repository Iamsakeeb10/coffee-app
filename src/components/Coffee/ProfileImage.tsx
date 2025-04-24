import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {colors} from '../../constants/colors';
import {setUser} from '../../redux/slices/authSlice';
import {RootState} from '../../redux/store/store';
import styles from '../../styles/profileScreenStyles';
import {requestAndroidPermission} from '../../utils/handlePermissions';
import {
  captureImage,
  processAndConvertToBase64,
  saveBase64ProfileImage,
  selectFromGallery,
  showError,
  showSuccess,
} from '../../utils/profileImageHelpers';
import BottomSheet from '../Common/BottomSheet';
import CustomAlert from '../Common/CustomAlert';

const {width} = Dimensions.get('window');

interface ProfileImageProps {
  photoURL: string | null | undefined;
}

const ProfileImage: React.FC<ProfileImageProps> = ({photoURL}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);
  const [uploading, setUploading] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [deniedPermissions, setDeniedPermissions] = useState<{
    camera: boolean;
    gallery: boolean;
  }>({
    camera: false,
    gallery: false,
  });

  const toggleBottomSheet = () => setShowSheet(prev => !prev);

  const showPermissionAlert = (type: 'camera' | 'gallery') => {
    setAlertTitle(
      `${type === 'camera' ? 'Camera' : 'Gallery'} Permission Required`,
    );
    setAlertMessage(
      `Please enable ${
        type === 'camera' ? 'Camera' : 'Storage'
      } access in settings.`,
    );
    setAlertVisible(true);
  };

  const handleAlertConfirm = () => {
    setAlertVisible(false);
    Linking.openSettings();
  };

  const handleAlertCancel = () => {
    setAlertVisible(false);
  };

  const handleImage = async (
    action: () => Promise<any>,
    type: 'camera' | 'gallery',
  ) => {
    setTimeout(() => {
      setShowSheet(false);
    }, 50);

    if (Platform.OS === 'android') {
      const granted = await requestAndroidPermission(
        type,
        setDeniedPermissions,
      );
      if (!granted) {
        setTimeout(() => {
          if (deniedPermissions[type]) {
            showPermissionAlert(type);
          }
        }, 300);
        return;
      }
    }

    try {
      const result = await action();

      if (result.didCancel || !result.assets || result.assets.length === 0)
        return;

      const asset = result.assets[0];

      const base64 = asset.base64
        ? asset.base64
        : asset.uri
        ? await processAndConvertToBase64(asset.uri)
        : null;

      if (!base64) return;

      const currentUser = auth().currentUser;
      if (!currentUser) {
        showError('You must be logged in to update your profile');
        return;
      }

      setUploading(true);

      const updatedPhotoURL = await saveBase64ProfileImage(
        base64,
        currentUser.uid,
      );

      dispatch(setUser({...user, photoURL: updatedPhotoURL}));
      showSuccess('Profile picture updated successfully');
    } catch (error) {
      console.error('Image update failed:', error);
      showError('Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.profileImageContainer}>
      <Image
        source={
          photoURL
            ? {uri: photoURL}
            : require('../../assets/images/profile.png')
        }
        style={[styles.avatar, photoURL && styles.border]}
      />
      <TouchableOpacity
        style={styles.uploadIcon}
        onPress={toggleBottomSheet}
        disabled={uploading}>
        <Ionicons
          name={uploading ? 'hourglass-outline' : 'camera'}
          size={16}
          color={colors.white}
        />
      </TouchableOpacity>

      <BottomSheet
        visible={showSheet}
        onClose={toggleBottomSheet}
        heightRatio={0.36}>
        <View style={styles.uploadSheetContainer}>
          <Text style={styles.uploadSheetTitle}>Update Profile Picture</Text>
          <TouchableOpacity
            onPress={() => handleImage(captureImage, 'camera')}
            style={styles.sheetOption}>
            <View style={styles.optionContent}>
              <Ionicons
                name="camera-outline"
                size={24}
                color={colors.white}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Take Photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleImage(selectFromGallery, 'gallery')}
            style={styles.sheetOption}>
            <View style={styles.optionContent}>
              <Ionicons
                name="image-outline"
                size={24}
                color={colors.white}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleBottomSheet}
            style={styles.sheetOption}>
            <View style={styles.optionContent}>
              <Ionicons
                name="close-outline"
                size={24}
                color={colors.white}
                style={[styles.optionIcon, {backgroundColor: colors.deepRed}]}
              />
              <Text style={[styles.optionText, {color: colors.deepRed}]}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onCancel={handleAlertCancel}
        onConfirm={handleAlertConfirm}
        cancelText="Cancel"
        confirmText="Open Settings"
        confirmBgColor={colors.alertBtnBg}
      />
    </View>
  );
};

export default ProfileImage;
