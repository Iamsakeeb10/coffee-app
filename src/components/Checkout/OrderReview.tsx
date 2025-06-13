import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

const placeOrderAPI = async (): Promise<{
  success: boolean;
  orderNumber: string;
}> => {
  return new Promise(resolve => {
    setTimeout(() => {
      // Simulate 90% success rate
      const success = Math.random() > 0.1;
      resolve({
        success,
        orderNumber: `ORD-${new Date().getFullYear()}-${
          Math.floor(Math.random() * 900000) + 100000
        }`,
      });
    }, 2000); // 2 second delay
  });
};

const OrderReview = ({data}: AddressCardProps) => {
  const {items, totalAmount} = useSelector((state: RootState) => state.cart);
  const {total} = calculateOrderTotals(totalAmount);
  const [isBottom, setIsBottom] = useState(false);
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigation = useNavigation();

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    setIsBottom(isAtBottom);

    // Check if user has scrolled past 100px
    if (contentOffset.y > 5) {
      setHasScrolledEnough(true);
    } else {
      setHasScrolledEnough(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;

    setIsPlacingOrder(true);

    try {
      const result = await placeOrderAPI();

      if (result.success) {
        // Calculate estimated delivery date (3-5 business days)
        const deliveryDate = new Date();
        deliveryDate.setDate(
          deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3,
        );
        const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        // Navigate to success screen with data
        navigation.navigate('OrderSuccessScreen', {
          orderNumber: result.orderNumber,
          estimatedDelivery: `${estimatedDelivery} (3-5 business days)`,
          customerInfo: {
            name: data?.fullName || 'Customer',
            phone: data?.phone || '',
            address: `${data?.city || ''}, ${data?.thana || ''}, ${
              data?.country || ''
            }`,
            email: data?.email || '',
          },
          orderSummary: {
            totalItems: items.length,
            totalAmount: total,
            items: processedItems.map(item => ({
              name: item.name,
              quantity: item.sizes.length,
              price: item.sizes.reduce(
                (sum, size) => sum + (size.price || 0),
                0,
              ),
            })),
          },
          orderDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
      } else {
        Alert.alert(
          'Order Failed',
          'Something went wrong while placing your order. Please try again.',
          [{text: 'OK'}],
        );
      }
    } catch (error) {
      Alert.alert(
        'Network Error',
        'Please check your internet connection and try again.',
        [{text: 'OK'}],
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          borderBottomWidth: hasScrolledEnough ? 1 : 0,
          borderColor: 'rgba(255,255,255,0.4)',
          paddingBottom: 16,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}>
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
          onPlaceOrder={handlePlaceOrder}
          isBottom={isBottom}
          isLoading={isPlacingOrder}
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  extraSection: {
    // marginTop: 20,
    // Add styling for your extra content
  },
});
