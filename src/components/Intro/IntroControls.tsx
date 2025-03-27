import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {styles} from '../../styles/introScreenStyles';
import {alertHandler} from '../../utils/alertHandler';

interface IntroControlsProps {
  currentPage: number;
  scrollX: any;
  width: number;
  goToPreviousPage: (page: number) => void;
  goToNextPage: (page: number) => void;
  pagesLength: number;
}

const IntroControls: React.FC<IntroControlsProps> = ({
  currentPage,
  scrollX,
  width,
  goToPreviousPage,
  goToNextPage,
  pagesLength,
}) => {
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
        <Pressable
          hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
          onPress={alertHandler}>
          <Text style={styles.getStartedText}>Get started</Text>
        </Pressable>
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
