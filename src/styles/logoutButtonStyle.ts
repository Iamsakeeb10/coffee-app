import {Dimensions, StyleSheet} from 'react-native';
import {colors, staticColors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  bottomSheetContainer: {
    // width: width / 1.1,
    // alignSelf: 'center',
    marginTop: 16,
    borderRadius: 8,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: width / 1.1,
    alignSelf: 'center',
  },
  bottomSheetHeaderTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheetTitle: {
    fontSize: 19,
    color: colors.logoutText,
    fontFamily: fontFamily.medium,
    marginBottom: 8,
  },
  bottomSheetSubtitle: {
    fontFamily: fontFamily.regular,
    color: colors.muted,
    fontSize: 15,
  },
  bottomSheetSpacer: {
    height: 15,
  },

  footerContainer: {
    borderWidth: 0.5,
    borderColor: staticColors.borderColor,
  },

  bottomSheetButtonContainer: {
    width: width / 1.1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },

  border: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: staticColors.borderColor,
    position: 'absolute',
    bottom: 0,
    right: '50%',
    top: 0,
  },

  bottomSheetCancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
  },
  bottomSheetCancelText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.muted,
  },
  bottomSheetLogoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  bottomSheetLogoutText: {
    color: colors.circle,
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
});

export default styles;
