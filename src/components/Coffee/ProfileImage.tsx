import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
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
import {
  captureImage,
  processAndConvertToBase64,
  saveBase64ProfileImage,
  selectFromGallery,
  showError,
  showSuccess,
} from '../../utils/profileImageHelpers';
import BottomSheet from '../Common/BottomSheet';

const {width} = Dimensions.get('window');

interface ProfileImageProps {
  photoURL: string | null | undefined;
}

const ProfileImage: React.FC<ProfileImageProps> = ({photoURL}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);
  const [uploading, setUploading] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  const toggleBottomSheet = () => setShowSheet(prev => !prev);

  const requestAndroidPermission = async (type: 'camera' | 'gallery') => {
    try {
      let permission;

      if (type === 'camera') {
        permission = PermissionsAndroid.PERMISSIONS.CAMERA;
      } else {
        const androidVersion = Number(Platform.Version);
        permission =
          androidVersion >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      }

      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) return true;

      const granted = await PermissionsAndroid.request(permission);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleImage = async (
    action: () => Promise<any>,
    type: 'camera' | 'gallery',
  ) => {
    if (Platform.OS === 'android') {
      const granted = await requestAndroidPermission(type);
      if (!granted) {
        setShowSheet(false);
        setTimeout(() => {
          showError(
            `Permission denied. Please enable ${
              type === 'camera' ? 'Camera' : 'Storage'
            } access in settings.`,
          );
        }, 400);
        return;
      }
    }

    setShowSheet(false);
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
    </View>
  );
};

export default ProfileImage;
