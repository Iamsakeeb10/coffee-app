import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.alertColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.8,
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 20,
    elevation: 5,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 3},
    shadowRadius: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.medium,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.skeletonBackground,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  cancelText: {
    color: colors.background,
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
  confirmText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
});

export default styles;
