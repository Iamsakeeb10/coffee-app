import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import IconButton from '../Common/IconButton';
import IconButtonImage from '../Common/IconButtonImage';

type Props = {
  profileImage?: string | null;
};

const ProfileIconButton = ({profileImage}: Props) => {
  const navigation = useNavigation<any>();

  const navigationHandler = () => {
    navigation.navigate('ProfileScreen');
  };

  return profileImage ? (
    <IconButtonImage onPress={navigationHandler} style={styles.imageButton}>
      <Image
        source={{uri: profileImage}}
        style={styles.image}
        resizeMode="cover"
      />
    </IconButtonImage>
  ) : (
    <IconButton
      iconName="person-circle"
      onPress={navigationHandler}
      iconSize={26}
      iconColor={colors.white}
      iconStyle={styles.icon}
      style={styles.iconButton}
    />
  );
};

const styles = StyleSheet.create({
  imageButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 0,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 12,
  },
  iconButton: {
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'relative',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});

export default ProfileIconButton;
