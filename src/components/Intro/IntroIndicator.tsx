import React from 'react';
import {View} from 'react-native';
import {PageIndicator} from 'react-native-page-indicator';
import {colors} from '../../constants/colors';
import {styles} from '../../styles/introScreenStyles';

interface IntroIndicatorProps {
  animatedCurrent: any;
  pagesLength: number;
}

const IntroIndicator: React.FC<IntroIndicatorProps> = ({
  animatedCurrent,
  pagesLength,
}) => {
  return (
    <View style={styles.pageIndicator}>
      <PageIndicator
        count={pagesLength}
        current={animatedCurrent}
        color={colors.white}
      />
    </View>
  );
};

export default IntroIndicator;
