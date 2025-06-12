import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from '../../hooks/useTheme';
import {RootState} from '../../redux/store/store';
import {GroupedCartItem} from '../../types/Cart/useCart.type';
import {calculateOrderTotals} from '../../utils/helpers';
import {fontFamily} from '../../utils/typography';
import CartList from '../Cart/CartList';
import AddressCard from './AddressCard';
import OrderReviewFooter from './OrderReviewFooter';
import OrderSummary from './OrderSummary';

type ShippingData = {
  fullName: string;
  address: string;
  city: string;
  state: string;
  thana: string;
  country: string;
  phone: string;
  email: string;
};

interface AddressCardProps {
  data: ShippingData | null;
}

const OrderReview = ({data}: AddressCardProps) => {
  const {items, totalAmount} = useSelector((state: RootState) => state.cart);
  const {total} = calculateOrderTotals(totalAmount);
  // const {fullName, phone} = data;

  const {colors} = useTheme();

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
          <AddressCard
            name={data?.fullName || ''}
            phone={data?.phone || ''}
            street={data?.city || ''}
            city={data?.thana || ''}
          />
          <View>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 17,
                fontFamily: fontFamily.medium,
                marginBottom: 12,
              }}>
              Products
            </Text>
            <CartList
              readOnly
              items={processedItems}
              onIncrement={() => {}}
              onDecrement={() => {}}
            />
          </View>

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
