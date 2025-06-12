import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from '../../hooks/useTheme';
import {RootState} from '../../redux/store/store';
import {calculateOrderTotals} from '../../utils/helpers';
import {fontFamily} from '../../utils/typography';

const OrderSummary = () => {
  const {colors} = useTheme();
  const {totalAmount} = useSelector((state: RootState) => state.cart);

  const {tax, total} = calculateOrderTotals(totalAmount);

  return (
    <View>
      <Text style={[styles.orderSummaryTitle, {color: colors.textPrimary}]}>
        Order Summary
      </Text>

      <View
        style={[
          styles.orderSummaryContainer,
          {
            backgroundColor: colors.backgroundCard,
            borderColor: colors.gray500,
          },
        ]}>
        <View style={styles.orderRow}>
          <Text style={[styles.orderItemText, {color: colors.stepLabel}]}>
            Subtotal
          </Text>
          <Text style={[styles.orderItemValue, {color: colors.textPrimary}]}>
            $ {totalAmount.toFixed(2)}
          </Text>
        </View>

        <View style={styles.orderRow}>
          <Text style={[styles.orderItemText, {color: colors.stepLabel}]}>
            Tax (10%)
          </Text>
          <Text style={[styles.orderItemValue, {color: colors.textPrimary}]}>
            $ {tax.toFixed(2)}
          </Text>
        </View>

        <View style={styles.orderRow}>
          <Text style={[styles.orderItemText, {color: colors.stepLabel}]}>
            Shipping
          </Text>
          <Text style={[styles.orderItemValue, {color: colors.textPrimary}]}>
            Free
          </Text>
        </View>

        <View style={[styles.totalRow, {borderTopColor: colors.gray500}]}>
          <Text style={[styles.totalText, {color: colors.textPrimary}]}>
            Total
          </Text>
          <Text style={[styles.totalValue, {color: colors.textPrimary}]}>
            $ {total.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  orderSummaryContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
  },
  orderSummaryTitle: {
    fontSize: 17,
    fontFamily: fontFamily.medium,
    marginBottom: 12,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItemText: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
  },
  orderItemValue: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  totalText: {
    fontSize: 17,
    fontFamily: fontFamily.medium,
  },
  totalValue: {
    fontSize: 17,
    fontFamily: fontFamily.bold,
  },
});
