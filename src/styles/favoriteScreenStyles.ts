import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const {height, width} = Dimensions.get('window');

const favoritesScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  favoriteItemContainer: {
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: colors.favoriteBg,
  },
  imageBackgroundWrapper: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    height: height * 0.5,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  topButtons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  removeButton: {
    backgroundColor: colors.arrowLightBlackShadow,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: colors.overlay,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: colors.textPrimary,
    fontFamily: fontFamily.medium,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.subTitle,
    marginVertical: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
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
  descriptionContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  descriptionTitle: {
    color: colors.subTitle,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    marginBottom: 8,
  },
  descriptionText: {
    color: colors.white,
    marginBottom: 16,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    color: colors.gray,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: fontFamily.medium,
    color: colors.emptyFavTitle,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.emptyFavSubTitle,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    paddingHorizontal: 32,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  flatListContent: {
    width: width / 1.1,
    alignSelf: 'center',
    flex: 0, // Initially set to 0, will be 1 if empty
  },
});

export default favoritesScreenStyles;
