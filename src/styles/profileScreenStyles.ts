import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'space-between',
  },
  profileCard: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fontFamily.medium,
  },
  phone: {
    color: colors.iconColor,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    marginTop: 4,
  },

  accountText: {
    color: colors.background,
    fontFamily: fontFamily.medium,
    fontSize: 18,
    marginBottom: 10,
    width: width / 1.15,
    alignSelf: 'center',
  },
  menuContainer: {
    backgroundColor: colors.menuContainer,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    width: width / 1.15,
    alignSelf: 'center',
  },
  menuIconWrap: {
    backgroundColor: colors.menuIcon,
    padding: 8,
    borderRadius: 8,
    marginRight: 14,
  },
  menuText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.cardBackground,
  },

  bottomSheetContainer: {
    width: width / 1.1,
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 8,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  bottomSheetButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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

  profileImageContainer: {
    position: 'relative',
    marginBottom: 5,
  },

  uploadIcon: {
    position: 'absolute',
    bottom: 6,
    right: 5,
    backgroundColor: colors.cardBackground,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },

  border: {
    borderWidth: 2,
    borderColor: colors.white,
  },

  uploadSheetContainer: {
    paddingVertical: 20,
    width: width / 1.15,
    alignSelf: 'center',
  },

  uploadSheetTitle: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    marginBottom: 16,
  },

  sheetOption: {
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    color: colors.background,
    fontSize: 16,
    textAlign: 'left',
    fontFamily: fontFamily.regular,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 15,
    backgroundColor: colors.cardBackground, // Make all icons have same background color
    padding: 8,
    borderRadius: 24,
  },
});

export default styles;
