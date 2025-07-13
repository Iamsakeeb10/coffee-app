import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {staticColors} from '../../constants/colors';
import {useTheme} from '../../hooks/useTheme';
import {
  fetchOrderHistory,
  fetchOrderHistoryFromCloud,
  OrderHistory,
} from '../../redux/slices/orderHistorySlice';
import {RootState} from '../../redux/store/store';
import {RootStackParamList} from '../../types/navigation/types';
import {fontFamily} from '../../utils/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OrderHistoryScreen = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  const {orders, loading, error} = useSelector(
    (state: RootState) => state.orderHistory,
  );

  useEffect(() => {
    const loadOrders = async () => {
      const userId = auth().currentUser?.uid;

      if (userId) {
        await dispatch(fetchOrderHistoryFromCloud() as any);
      } else {
        // fallback to local AsyncStorage
        await dispatch(fetchOrderHistory() as any);
      }
    };

    loadOrders();
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const userId = auth().currentUser?.uid;

      if (userId) {
        await dispatch(fetchOrderHistoryFromCloud() as any);
      } else {
        await dispatch(fetchOrderHistory() as any);
      }
    } catch (error) {
      console.error('Error refreshing orders:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getStatusColor = (status: OrderHistory['status']) => {
    switch (status) {
      case 'pending':
        return '#FF9500';
      case 'confirmed':
        return '#007AFF';
      case 'shipped':
        return '#5856D6';
      case 'delivered':
        return '#34C759';
      case 'cancelled':
        return '#FF3B30';
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: OrderHistory['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const handleOrderPress = (order: OrderHistory) => {
    // Navigate to order details screen
    navigation.navigate('OrderDetailsScreen', {orderId: order.id});
    // Alert.alert('Order Details', `Order Number: ${order.orderNumber}`);
  };

  const renderOrderItem = ({item}: {item: OrderHistory}) => (
    <TouchableOpacity
      style={[styles.orderCard, {backgroundColor: colors.backgroundCard}]}
      onPress={() => handleOrderPress(item)}
      activeOpacity={0.7}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={[styles.orderNumber, {color: colors.textPrimary}]}>
            {item.orderNumber}
          </Text>
          <Text style={[styles.orderDate, {color: colors.orderDate}]}>
            {item.orderDate}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              {backgroundColor: getStatusColor(item.status) + '20'},
            ]}>
            <Text
              style={[styles.statusText, {color: getStatusColor(item.status)}]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.orderContent}>
        <View style={styles.itemsContainer}>
          <View style={styles.itemsRow}>
            {item.items.slice(0, 3).map((orderItem, index) => (
              <View key={index} style={styles.itemImageContainer}>
                {orderItem.imageURL ? (
                  <Image
                    source={{uri: orderItem.imageURL}}
                    style={styles.itemImage}
                  />
                ) : (
                  <View
                    style={[
                      styles.itemImagePlaceholder,
                      {backgroundColor: colors.backgroundCard},
                    ]}>
                    <Text
                      style={[
                        styles.itemImagePlaceholderText,
                        {color: colors.textSecondary},
                      ]}>
                      {orderItem.name.charAt(0)}
                    </Text>
                  </View>
                )}
              </View>
            ))}
            {item.items.length > 3 && (
              <View
                style={[
                  styles.moreItemsContainer,
                  {backgroundColor: colors.backgroundCard},
                ]}>
                <Text
                  style={[styles.moreItemsText, {color: colors.textSecondary}]}>
                  +{item.items.length - 3}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.itemsInfo}>
            <Text style={[styles.itemsCount, {color: colors.orderDate}]}>
              {item.totalItems} {item.totalItems === 1 ? 'item' : 'items'}
            </Text>
            <Text style={[styles.totalAmount, {color: colors.textPrimary}]}>
              $ {item.totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.deliveryInfo}>
          <Text style={[styles.deliveryLabel, {color: colors.orderDate}]}>
            {item.status === 'delivered' ? 'Delivered on' : 'Expected delivery'}
          </Text>
          <Text style={[styles.deliveryDate, {color: colors.textPrimary}]}>
            {item.status === 'delivered' && item.actualDelivery
              ? item.actualDelivery
              : item.estimatedDelivery}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleOrderPress(item)}>
          <Text style={[styles.actionButtonText, {color: colors.textPrimary}]}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={80} color={staticColors.gray} />
      <Text
        style={[
          styles.emptyTitle,
          {
            color: colors.emptyStateTitle,
          },
        ]}>
        No order history yet
      </Text>
      <Text
        style={[
          styles.emptySubtitle,
          {
            color: colors.emptyFavSubTitle,
          },
        ]}>
        Your order history will appear here
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={[styles.errorTitle, {color: colors.textPrimary}]}>
        Oops! Something went wrong
      </Text>
      <Text style={[styles.errorSubtitle, {color: colors.textSecondary}]}>
        {error}
      </Text>
      <TouchableOpacity
        style={[styles.retryButton, {backgroundColor: colors.textPrimary}]}
        onPress={() => dispatch(fetchOrderHistory() as any)}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && !refreshing && orders.length === 0) {
    return (
      <View
        style={[
          styles.loadingContainer,
          {backgroundColor: colors.backgroundDefault},
        ]}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }

  if (error && orders.length === 0) {
    return (
      <View
        style={[styles.container, {backgroundColor: colors.backgroundDefault}]}>
        {renderError()}
      </View>
    );
  }

  return (
    <View
      style={[styles.container, {backgroundColor: colors.backgroundDefault}]}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContainer,
          {flex: orders.length === 0 ? 1 : 0},
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.backgroundDefault]}
            tintColor={colors.textPrimary}
          />
        }
        ListEmptyComponent={renderEmptyList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    // paddingBottom: 100,
    // flex: 1,
  },
  orderCard: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    textTransform: 'capitalize',
  },
  orderContent: {
    marginBottom: 12,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    color: staticColors.gray,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: fontFamily.medium,
    color: staticColors.emptyFavTitle,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: staticColors.emptyFavSubTitle,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    paddingHorizontal: 32,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImageContainer: {
    marginRight: 8,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  itemImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  itemImagePlaceholderText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  moreItemsContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  moreItemsText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
  },
  itemsInfo: {
    alignItems: 'flex-end',
  },
  itemsCount: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  orderFooter: {
    // backgroundColor: 'coral',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    marginBottom: 2,
  },
  deliveryDate: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
  },
  actionButton: {
    // paddingHorizontal: 12,j
    paddingVertical: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
  separator: {
    height: 8,
  },
  // emptyContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingHorizontal: 32,
  //   paddingTop: 100,
  // },
  // emptyTitle: {
  //   fontSize: 20,
  //   fontFamily: fontFamily.medium,
  //   marginBottom: 8,
  // },
  // emptySubtitle: {
  //   fontSize: 16,
  //   fontFamily: fontFamily.regular,
  //   textAlign: 'center',
  //   lineHeight: 24,
  // },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: fontFamily.medium,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    marginTop: 16,
  },
});

export default OrderHistoryScreen;
