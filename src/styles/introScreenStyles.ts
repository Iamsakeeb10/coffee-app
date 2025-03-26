import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const {height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  contentWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 32,
    letterSpacing: 0.5,
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    marginBottom: 12,
    textShadowColor: colors.blackShadow,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  description: {
    color: colors.lightGray,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    lineHeight: 20,
    letterSpacing: 1,
    textShadowColor: colors.lightBlackShadow,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 4,
  },
  pageIndicator: {
    position: 'absolute',
    bottom: height - height * 0.96,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height - height * 0.975,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  getStartedText: {
    color: colors.white,
    marginBottom: 3,
    fontSize: 15,
    fontFamily: fontFamily.medium,
  },

  skipButton: {
    position: 'absolute',
    top: height - height * 0.93,
    right: 20,
    backgroundColor: colors.gray,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    elevation: 8,
  },
});
