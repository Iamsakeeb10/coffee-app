import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import IconButtonImage from '../Common/IconButtonImage';

type Props = {
  profileImage?: string | null;
};

const ProfileIconButton = ({profileImage}: Props) => {
  const navigation = useNavigation<any>();

  const navigationHandler = () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <IconButtonImage onPress={navigationHandler}>
      <Image
        source={
          profileImage
            ? {uri: profileImage}
            : require('../../assets/images/profile.png')
        }
        style={[styles.image, !profileImage && styles.border]}
        resizeMode="cover"
      />
    </IconButtonImage>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  border: {
    borderWidth: 2,
    borderColor: colors.skeletonBackground,
  },
});

export default ProfileIconButton;
