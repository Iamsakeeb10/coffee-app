import React from 'react';
import {Pressable, Text} from 'react-native';
import {colors} from '../constants/colors';
import {styles} from '../styles/introScreenStyles';

interface IntroSkipButtonProps {
  alertHandler: () => void;
}

const IntroSkipButton: React.FC<IntroSkipButtonProps> = ({alertHandler}) => {
  return (
    <Pressable
      hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
      onPress={alertHandler}
      style={styles.skipButton}>
      <Text style={{color: colors.white}}>Skip</Text>
    </Pressable>
  );
};

export default IntroSkipButton;
