import {StyleSheet} from 'react-native';
import {fontSizes} from '../constants/fontSizes';
import {spacing} from '../constants/spacing';
import {widthPercent} from '../utils/dimensions';
import {fontFamily} from '../utils/typography';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 0,
    elevation: 8,
    shadowOpacity: 0,
  },
  headerContent: {
    // height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthPercent(90.9),
    alignSelf: 'center',
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconButton: {
    padding: spacing.spacing4,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: fontSizes.font20,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
  },
});

export default styles;
