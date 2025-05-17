import {StyleSheet} from 'react-native';
import {borderRadius} from '../constants/borderRadius';
import {colors} from '../constants/colors';
import {fontSizes} from '../constants/fontSizes';
import {spacing} from '../constants/spacing';
import {fontFamily} from '../utils/typography';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.radius24,
    borderTopRightRadius: borderRadius.radius24,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.spacing16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: colors.dragHandle,
    borderRadius: borderRadius.radius3,
    marginBottom: spacing.spacing16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.spacing10,
  },
  titleIcon: {
    marginRight: spacing.spacing8,
  },
  titleText: {
    fontSize: fontSizes.font18,
    fontFamily: fontFamily.medium,
    color: colors.langLabel,
  },
  separator: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: spacing.spacing20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.spacing16,
    paddingHorizontal: spacing.spacing20,
    marginHorizontal: spacing.spacing12,
    borderRadius: borderRadius.radius12,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    fontFamily: fontFamily.medium,
  },
  flag: {
    fontSize: fontSizes.font24,
    marginRight: spacing.spacing16,
  },
  languageName: {
    fontSize: fontSizes.font16,
    color: colors.langLabel,
  },
  selectedIndicator: {
    width: fontSizes.font22,
    height: fontSizes.font22,
    borderRadius: borderRadius.radius100,
    backgroundColor: colors.accentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheck: {
    color: colors.white,
    fontSize: fontSizes.font12,
  },
  applyButtonContainer: {
    padding: spacing.spacing16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  applyButton: {
    backgroundColor: colors.accentPrimary,
    paddingVertical: spacing.spacing14,
    borderRadius: borderRadius.radius12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 3,
  },
  applyButtonText: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.font16,
  },
  applyButtonIcon: {
    color: colors.white,
    marginLeft: spacing.spacing4,
    marginTop: spacing.spacing4,
  },
});

export default styles;
