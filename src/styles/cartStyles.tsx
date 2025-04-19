import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const {width, height} = Dimensions.get('window');

export const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  descriptionTitle: {
    color: colors.subTitle,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    marginBottom: 8,
  },

  priceText: {
    textAlign: 'left',
  },

  cartButton: {
    backgroundColor: colors.circle,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },

  price: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.white,
  },

  cartText: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: 18,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dollarSign: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.circle,
  },

  listContent: {
    width: width / 1.1,
    alignSelf: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    alignItems: 'center',
  },
  itemImage: {
    height: '100%',
    width: width * 0.35,
    borderRadius: 20,
  },
  itemDetails: {
    flex: 0.95,
    marginLeft: 14,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 12,
    color: colors.subTitle,
    marginBottom: 10,
  },
  itemSize: {
    fontSize: 12,
    color: colors.gray,
  },

  sizeButton: {
    width: 65,
    height: 35,
    paddingVertical: 4,
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  sizeText: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: 20,
  },

  itemPrice: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.white,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: colors.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fontFamily.medium,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 51, 51, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width / 1.1,
    alignSelf: 'center',
    gap: 10,
  },

  priceContainer: {
    flex: 1,
  },

  payButtonFull: {
    flex: 1,
    backgroundColor: colors.circle,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  totalContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: colors.white,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  checkoutButton: {
    backgroundColor: colors.circle,
    borderRadius: 15,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Styles for the quantity badge
  quantityBadge: {
    backgroundColor: colors.background,
    paddingVertical: 4,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.circle,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 50,
  },

  itemPriceDollar: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.circle,
  },

  itemPriceValue: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.white,
  },

  sizePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  priceValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  groupCartItem: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    marginBottom: 16,
    padding: 14,
    overflow: 'hidden',
  },

  groupItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  groupItemImage: {
    height: width * 0.37,
    width: width * 0.35,
    borderRadius: 20,
  },

  groupItemInfo: {
    flex: 1,
    marginLeft: 14,
  },

  groupSizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    marginTop: 6,
  },

  groupSizeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
