import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {completeOnboarding} from '../../redux/slices/onboardingSlice';
import {styles} from '../../styles/introScreenStyles';
import {IntroSkipButtonProps} from '../../types/types';

const IntroSkipButton: React.FC<IntroSkipButtonProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const navigationHandler = () => {
    dispatch(completeOnboarding());
    navigation.replace('LoginScreen');
  };

  return (
    <TouchableOpacity
      hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
      onPress={navigationHandler}
      style={styles.skipButton}>
      <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
  );
};

export default IntroSkipButton;
