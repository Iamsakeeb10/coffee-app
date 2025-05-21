import {StyleSheet} from 'react-native';
import {fontSizes} from '../constants/fontSizes';
import {spacing} from '../constants/spacing';
import {fontFamily} from '../utils/typography';

const styles = StyleSheet.create({
  featuredTitle: {
    fontSize: fontSizes.font18,
    fontFamily: fontFamily.medium,
    marginBottom: spacing.spacing4,
  },

  emptyStateTitleStyle: {
    fontSize: fontSizes.font16,
    marginTop: spacing.spacing8,
  },
});

export default styles;
