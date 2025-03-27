import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colors} from '../../constants/colors';
import {styles} from '../../styles/introScreenStyles';
import {IntroSkipButtonProps} from '../../types/types';

const IntroSkipButton: React.FC<IntroSkipButtonProps> = ({navigation}) => {
  const navigationHandler = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <TouchableOpacity
      hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
      onPress={navigationHandler}
      style={styles.skipButton}>
      <Text style={{color: colors.white}}>Skip</Text>
    </TouchableOpacity>
  );
};

export default IntroSkipButton;
