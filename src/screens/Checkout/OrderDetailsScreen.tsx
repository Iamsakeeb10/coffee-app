import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Header from '../../components/Common/Header';
import {staticColors} from '../../constants/colors';
import {useTheme} from '../../hooks/useTheme';
import {OrderHistory} from '../../redux/slices/orderHistorySlice';
import {RootState} from '../../redux/store/store';
import {fontFamily} from '../../utils/typography';

const OrderDetailsScreen = ({route}: {route: any}) => {
  const {orderId} = route.params;
  const {colors} = useTheme();
  const navigation = useNavigation();

  const order = useSelector((state: RootState) =>
    state.orderHistory.orders.find(o => o.id === orderId),
  );

  console.log(order);

  if (!order) {
    return (
      <View
        style={[
          styles.notFoundContainer,
          {backgroundColor: colors.backgroundDefault},
        ]}>
        <Ionicons
          name="receipt-outline"
          size={80}
          color={colors.textSecondary}
        />
        <Text style={[styles.notFoundTitle, {color: colors.textPrimary}]}>
          Order not found
        </Text>
        <Text style={[styles.notFoundSubtitle, {color: colors.textSecondary}]}>
          This order might have been removed or doesn't exist
        </Text>
      </View>
    );
  }

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

  const getTrackingSteps = () => {
    const steps = [
      {key: 'pending', label: 'Order Placed', icon: 'checkmark-circle'},
      {key: 'confirmed', label: 'Confirmed', icon: 'checkmark-circle'},
      {key: 'shipped', label: 'Shipped', icon: 'airplane'},
      {key: 'delivered', label: 'Delivered', icon: 'home'},
    ];

    const statusOrder = ['pending', 'confirmed', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const handleReorder = () => {
    Alert.alert(
      'Reorder Items',
      'Would you like to add these items to your cart?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Add to Cart', onPress: () => console.log('Reorder items')},
      ],
    );
  };

  const handleTrackOrder = () => {
    Alert.alert('Track Order', 'Opening tracking details...');
  };

  const renderTrackingStatus = () => {
    if (order.status === 'cancelled') {
      return (
        <View
          style={[
            styles.trackingContainer,
            {backgroundColor: colors.backgroundCard},
          ]}>
          <View style={styles.cancelledStatus}>
            <Ionicons name="close-circle" size={24} color="#FF3B30" />
            <Text style={[styles.cancelledText, {color: colors.textPrimary}]}>
              Order Cancelled
            </Text>
          </View>
        </View>
      );
    }

    const steps = getTrackingSteps();

    return (
      <View
        style={[
          styles.trackingContainer,
          {backgroundColor: colors.backgroundCard},
        ]}>
        <View style={styles.trackingHeader}>
          <Text style={[styles.trackingTitle, {color: colors.textPrimary}]}>
            Order Tracking
          </Text>
          {/* <TouchableOpacity onPress={handleTrackOrder}>
            <Text
              style={[
                styles.trackingLink,
                {color: getStatusColor(order.status)},
              ]}>
              View Details
            </Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.trackingSteps}>
          {steps.map((step, index) => (
            <View key={step.key} style={styles.trackingStep}>
              <View style={styles.stepIndicator}>
                <View
                  style={[
                    styles.stepCircle,
                    {
                      backgroundColor: step.completed
                        ? getStatusColor(order.status)
                        : colors.backgroundDefault,
                      borderColor: step.completed
                        ? getStatusColor(order.status)
                        : colors.textSecondary,
                    },
                  ]}>
                  <Ionicons
                    name={step.icon as any}
                    size={16}
                    color={step.completed ? '#FFFFFF' : colors.orderDate}
                  />
                </View>
                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      {
                        backgroundColor: step.completed
                          ? getStatusColor(order.status)
                          : colors.textSecondary,
                      },
                    ]}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  {
                    color: step.completed
                      ? colors.textPrimary
                      : colors.orderDate,
                    fontFamily: step.active
                      ? fontFamily.medium
                      : fontFamily.regular,
                  },
                ]}>
                {step.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Order Details"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        useSafeArea={true}
        backgroundColor={colors.backgroundDefault}
        color={colors.textPrimary}
      />

      <ScrollView
        style={[{backgroundColor: colors.backgroundDefault}]}
        showsVerticalScrollIndicator={false}>
        {/* Order Header */}
        <View
          style={[styles.headerCard, {backgroundColor: colors.backgroundCard}]}>
          <View style={styles.orderHeaderInfo}>
            <Text style={[styles.orderNumber, {color: colors.textPrimary}]}>
              {order.orderNumber}
            </Text>
            <Text style={[styles.orderDate, {color: colors.orderDate}]}>
              Placed on {order.orderDate}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                {backgroundColor: getStatusColor(order.status) + '20'},
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {color: getStatusColor(order.status)},
                ]}>
                {getStatusText(order.status)}
              </Text>
            </View>
          </View>
        </View>

        {/* Tracking Status */}
        {renderTrackingStatus()}

        {/* Order Summary */}
        <View
          style={[
            styles.summaryCard,
            {backgroundColor: colors.backgroundCard},
          ]}>
          <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>
            Order Summary
          </Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, {color: colors.orderDate}]}>
              Items ({order.totalItems})
            </Text>
            <Text style={[styles.summaryValue, {color: colors.textPrimary}]}>
              $ {order.totalAmount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, {color: colors.orderDate}]}>
              Delivery Fee
            </Text>
            <Text style={[styles.summaryValue, {color: colors.textPrimary}]}>
              $ 60
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, {color: colors.textPrimary}]}>
              Total Amount
            </Text>
            <Text style={[styles.totalValue, {color: colors.textPrimary}]}>
              $ {(order.totalAmount + 60).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Items List */}
        <View
          style={[styles.itemsCard, {backgroundColor: colors.backgroundCard}]}>
          <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>
            Items ({order.totalItems})
          </Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.itemImageContainer}>
                {item.imageURL ? (
                  <Image
                    source={{uri: item.imageURL}}
                    style={styles.itemImage}
                  />
                ) : (
                  <View
                    style={[
                      styles.itemImagePlaceholder,
                      {backgroundColor: colors.backgroundDefault},
                    ]}>
                    <Text
                      style={[
                        styles.itemImagePlaceholderText,
                        {color: colors.textSecondary},
                      ]}>
                      {item.name.charAt(0)}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemName, {color: colors.textPrimary}]}>
                  {item.name}
                </Text>
                {item.size && (
                  <Text style={[styles.itemSize, {color: colors.orderDate}]}>
                    Size: {item.size}
                  </Text>
                )}
                <Text style={[styles.itemQuantity, {color: colors.orderDate}]}>
                  Qty: {item.quantity}
                </Text>
              </View>
              <Text style={[styles.itemPrice, {color: colors.textPrimary}]}>
                $ {item.price.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Delivery Information */}
        <View
          style={[
            styles.deliveryCard,
            {backgroundColor: colors.backgroundCard},
          ]}>
          <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>
            Delivery Information
          </Text>
          <View style={styles.deliveryRow}>
            <Ionicons
              name="location-outline"
              size={20}
              color={colors.orderDate}
            />
            <View style={styles.deliveryInfo}>
              <Text style={[styles.deliveryLabel, {color: colors.orderDate}]}>
                Delivery Address
              </Text>
              <Text style={[styles.deliveryValue, {color: colors.textPrimary}]}>
                {order.customerInfo.address || 'Dhaka, Bangladesh'}
              </Text>
            </View>
          </View>
          <View style={styles.deliveryRow}>
            <Ionicons name="time-outline" size={20} color={colors.orderDate} />
            <View style={styles.deliveryInfo}>
              <Text style={[styles.deliveryLabel, {color: colors.orderDate}]}>
                {order.status === 'delivered'
                  ? 'Delivered on'
                  : 'Expected delivery'}
              </Text>
              <Text style={[styles.deliveryValue, {color: colors.textPrimary}]}>
                {order.status === 'delivered' && order.actualDelivery
                  ? order.actualDelivery
                  : order.estimatedDelivery}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        {order.status !== 'cancelled' && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                // {backgroundColor: colors.accentBadge},
                {borderColor: colors.textPrimary},
              ]}
              // onPress={handleReorder}
              onPress={() => navigation.replace('MainTabs')}>
              <Text
                style={[
                  styles.secondaryButtonText,
                  {color: colors.textPrimary},
                ]}>
                Go to Home
              </Text>
              {/* <Ionicons
                name="arrow-forward-outline"
                size={20}
                color="#FFFFFF"
              /> */}
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[
                styles.secondaryButton,
                {borderColor: colors.textPrimary},
              ]}
              onPress={navigation.replace('MainTabs')}>
              <Text
                style={[
                  styles.secondaryButtonText,
                  {color: colors.textPrimary},
                ]}>
                Go to Home
              </Text>
            </TouchableOpacity> */}
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  notFoundTitle: {
    fontSize: 20,
    fontFamily: fontFamily.medium,
    marginTop: 16,
    marginBottom: 8,
  },
  notFoundSubtitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    lineHeight: 24,
  },
  headerCard: {
    padding: 16,
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeaderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 20,
    fontFamily: fontFamily.medium,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },

  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },

  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    textTransform: 'capitalize',
  },
  trackingContainer: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trackingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trackingTitle: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
  },
  trackingLink: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
  trackingSteps: {
    paddingLeft: 8,
  },
  trackingStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLine: {
    width: 2,
    height: 20,
    marginTop: 4,
  },
  stepLabel: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
  cancelledStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelledText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    marginLeft: 8,
  },
  summaryCard: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  totalValue: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  itemsCard: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  itemImageContainer: {
    marginRight: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  itemImagePlaceholderText: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    marginBottom: 2,
  },
  itemSize: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  deliveryCard: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  deliveryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  deliveryLabel: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    marginBottom: 4,
  },
  deliveryValue: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
  actionsContainer: {
    margin: 16,
    marginTop: 8,
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  reorderButtonText: {
    color: staticColors.white,
    fontSize: 16,
    fontFamily: fontFamily.medium,
    marginRight: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});

export default OrderDetailsScreen;
