import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const {width, height} = Dimensions.get('window');

const itemWidth = width * 0.4;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  seperator: {
    width: 12,
  },

  flatlistContainer: {
    width: width / 1.1,
    alignSelf: 'center',
  },

  flatlistContentStyle: {
    paddingHorizontal: 0,
    marginVertical: 10,
  },

  title: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    marginBottom: 10,
    color: colors.white,
    maxWidth: width * 0.5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  details: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    textAlign: 'left',
    color: colors.white,
    marginTop: 8,
  },
  description: {
    color: colors.textSecondary,
    marginVertical: 4,
    textAlign: 'left',
    fontSize: 10,
  },
  price: {
    fontFamily: fontFamily.bold,
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
  },

  cardBottomContainer: {
    width: 30,
    height: 30,
    backgroundColor: colors.circle,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  signStyle: {
    color: colors.circle,
    fontFamily: fontFamily.bold,
    fontSize: 18,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  priceOuterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  coffeeItemContainer: {
    flex: 1,
    marginTop: 16,
  },

  imageContainer: {
    elevation: 8,
    padding: 10,
  },

  imageInnerContainer: {
    alignItems: 'center',
    marginBottom: 6,
  },

  circle: {
    marginTop: 4,
    width: 7,
    height: 7,
    borderRadius: 100,
    backgroundColor: colors.circle,
    alignSelf: 'center',
  },

  categoryItem: {
    fontFamily: fontFamily.bold,
  },

  logoutStyle: {
    position: 'relative',
    borderRadius: 8,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  filterInputContainer: {
    marginTop: 14,
  },

  filterIcon: {
    left: 2,
    backgroundColor: 'transparent',
  },

  filterInput: {
    width: '100%',
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    color: colors.inputTextColor,
    paddingLeft: 48,
    paddingRight: 10,
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },

  skeletonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    width: itemWidth,
  },

  skeletonRootContainer: {
    backgroundColor: '#252A32',
    padding: 10,
    borderRadius: 20,
    height: height * 0.335,
  },

  skeletonImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: colors.skeletonBackground,
    marginBottom: 16,
  },
  skeletonTitle: {
    width: '60%',
    height: 14,
    backgroundColor: colors.skeletonBackground,
    marginBottom: 8,
    borderRadius: 20,
  },
  skeletonDescription: {
    width: '80%',
    height: 10,
    backgroundColor: colors.skeletonBackground,
    marginBottom: 8,
    borderRadius: 20,
  },

  skeletonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    borderRadius: 20,
  },

  skeletonPrice: {
    width: '40%',
    height: 14,
    backgroundColor: colors.skeletonBackground,
    borderRadius: 20,
  },
  skeletonCardBottom: {
    width: 30,
    height: 30,
    backgroundColor: colors.skeletonBackground,
    borderRadius: 8,
  },
});

export default styles;
