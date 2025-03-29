import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {styles} from '../../styles/introScreenStyles';
import {IntroControlsProps} from '../../types/types';

const IntroControls: React.FC<IntroControlsProps> = ({
  currentPage,
  scrollX,
  width,
  goToPreviousPage,
  goToNextPage,
  pagesLength,
  navigation,
}) => {
  const navigationHandler = () => {
    navigation.replace('LoginScreen');
  };

  return (
    <View
      style={[
        styles.buttonContainer,
        {justifyContent: currentPage === 0 ? 'flex-end' : 'space-between'},
      ]}>
      {(currentPage === 1 || currentPage === 2) && (
        <TouchableOpacity
          hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
          onPress={() => goToPreviousPage(Math.round(scrollX._value / width))}>
          <Ionicons name="arrow-back-outline" size={26} color={colors.white} />
        </TouchableOpacity>
      )}
      {currentPage === pagesLength - 1 ? (
        <TouchableOpacity
          hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
          onPress={navigationHandler}>
          <Text style={styles.getStartedText}>Get started</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
          onPress={() => goToNextPage(Math.round(scrollX._value / width))}>
          <Ionicons
            name="arrow-forward-outline"
            size={26}
            color={colors.white}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default IntroControls;
