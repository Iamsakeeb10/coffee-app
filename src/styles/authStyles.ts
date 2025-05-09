import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  fullWidth: {
    flex: 1,
  },

  headerTextContainer: {
    flex: 1,
    marginTop: height * 0.03,
    marginBottom: height * 0.045,
  },
  formContainer: {
    alignItems: 'center',
  },

  logoContainer: {
    marginBottom: -25,
    alignItems: 'center',
  },

  logo: {
    width: width * 0.5,
    height: undefined,
    aspectRatio: 1,
  },

  safeAreaContainer: {
    width: width / 1.2,
    alignSelf: 'center',
  },

  bottomContainer: {
    marginTop: 20,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadySigninText: {
    fontFamily: fontFamily.light,
    color: colors.white,
    fontSize: 13,
  },
  signinText: {
    paddingLeft: 4,
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  headerText: {
    fontSize: 26,
    color: colors.lightGray,
    fontFamily: fontFamily.bold,
    lineHeight: 32,
    letterSpacing: 1,
    textShadowColor: colors.lightBlackShadow,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 4,
  },

  orTextContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },

  orText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 20,
    fontFamily: fontFamily.regular,
  },
});

export default styles;
