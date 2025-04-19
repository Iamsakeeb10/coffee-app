import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: colors.badge || 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: fontFamily.bold,
  },
});

export default styles;
