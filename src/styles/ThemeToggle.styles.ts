import {Dimensions, StyleSheet} from 'react-native';
import {borderRadius} from '../constants/borderRadius';
import {staticColors} from '../constants/colors';
import {fontSizes} from '../constants/fontSizes';
import {spacing} from '../constants/spacing';
import {widthPercent} from '../utils/dimensions';
import {fontFamily} from '../utils/typography';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: widthPercent(86.96),
    borderRadius: borderRadius.radius16,
    padding: spacing.spacing20,
    marginTop: spacing.spacing25,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: spacing.spacing16,
  },
  title: {
    fontSize: fontSizes.font18,
    fontFamily: fontFamily.medium,
    marginBottom: spacing.spacing4,
  },
  subtitle: {
    fontSize: fontSizes.font14,
    fontFamily: fontFamily.regular,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.spacing12,
    borderRadius: borderRadius.radius10,
    marginVertical: spacing.spacing8,
  },
  selectedOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: fontSizes.font16,
    fontFamily: fontFamily.regular,
  },
  icon: {
    marginRight: spacing.spacing8,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: staticColors.modalBackdrop,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    width: width / 1.3,
    borderRadius: borderRadius.radius12,
    overflow: 'hidden',
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.spacing16,
    borderBottomWidth: 1,
    borderBottomColor: staticColors.borderLight,
  },
  dropdownItemText: {
    fontSize: fontSizes.font16,
    fontFamily: fontFamily.regular,
  },
  themePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.spacing16,
  },
  previewCard: {
    width: '48%',
    height: 110,
    borderRadius: borderRadius.radius7,
    overflow: 'hidden',
  },
  previewHeader: {
    height: 20,
    backgroundColor: staticColors.headerText,
  },
  darkPreviewHeader: {
    height: 20,
    backgroundColor: '#444',
  },
  previewContent: {
    padding: spacing.spacing10,
  },
  lightPreviewLine: {
    height: 6,
    borderRadius: borderRadius.radius3,
    marginVertical: spacing.spacing4,
    backgroundColor: '#333',
  },
  darkPreviewLine: {
    height: 6,
    borderRadius: borderRadius.radius3,
    marginVertical: spacing.spacing4,
    backgroundColor: '#ddd',
  },
  noBottomBorder: {
    borderBottomWidth: 0,
  },
});

export default styles;
