import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {GroupedCartItem} from '../../types/Cart/useCart.type';
import {calculateOrderTotals} from '../../utils/helpers';
import CartList from '../Cart/CartList';
import OrderReviewFooter from './OrderReviewFooter';
import OrderSummary from './OrderSummary';

const OrderReview = () => {
  const {items, totalAmount} = useSelector((state: RootState) => state.cart);
  const {total} = calculateOrderTotals(totalAmount);

  const groupedItems = items.reduce<Record<string, GroupedCartItem>>(
    (groups, item) => {
      if (!groups[item.name]) {
        groups[item.name] = {
          name: item.name,
          subtitle: item.subtitle,
          imageURL: item.imageURL,
          sizes: [],
        };
      }
      groups[item.name].sizes.push(item);
      return groups;
    },
    {},
  );

  const processedItems = Object.values(groupedItems).map(group => ({
    ...group,
    useGroupedView: group.sizes.length > 1,
  }));

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <CartList
            readOnly
            items={processedItems}
            onIncrement={() => {}}
            onDecrement={() => {}}
          />

          {/* 👇 Add more components below this */}
          <OrderSummary />
        </View>
      </ScrollView>
      <View style={styles.extraSection}>
        <OrderReviewFooter
          items={items.length} // or your dynamic value
          total={total} // or your dynamic value
          onPlaceOrder={() => {
            // handle order submission
          }}
        />
      </View>
    </View>
  );
};

export default OrderReview;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 140,
  },
  container: {
    padding: 16,
  },
  extraSection: {
    // marginTop: 20,
    // Add styling for your extra content
  },
});
