import {StyleSheet} from 'react-native';
import {fontSizes} from '../constants/fontSizes';
import {letterSpacing} from '../constants/letterSpacing';
import {spacing} from '../constants/spacing';
import {widthPercent} from '../utils/dimensions';
import {fontFamily} from '../utils/typography';

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: fontSizes.font20,
    fontFamily: fontFamily.medium,
    marginTop: spacing.spacing16,
  },
  emptySubtitle: {
    fontSize: fontSizes.font16,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    paddingHorizontal: spacing.spacing30,
    lineHeight: spacing.spacing20,
    letterSpacing: letterSpacing.normal,
    maxWidth: widthPercent(80),
  },
});

export default styles;
