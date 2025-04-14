import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  content: {
    width: width / 1.1,
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    color: colors.textPrimary,
    fontFamily: fontFamily.medium,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.subTitle,
    marginVertical: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  rating: {
    color: colors.circle,
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  tag: {
    borderRadius: 5,
  },
  tagText: {
    color: colors.white,
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  descriptionTitle: {
    color: colors.subTitle,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    color: colors.white,
    marginBottom: 16,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.5,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  sizeButton: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginTop: 6,
  },
  sizeText: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dollarSign: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.circle,
  },

  priceText: {
    textAlign: 'left',
  },
  price: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.white,
  },
  cartButton: {
    backgroundColor: colors.circle,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  cartText: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: 18,
  },

  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 1.1,
    alignSelf: 'center',
  },

  iconButtonStyle: {
    backgroundColor: colors.arrowLightBlackShadow,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  descTransStyle: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
  },

  horzCenter: {
    width: width / 1.1,
    alignSelf: 'center',
  },
});

export default styles;
