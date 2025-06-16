// Updated OrderSuccessScreen.tsx - Get data from navigation params
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {fontFamily} from '../../utils/typography';

const {width, height} = Dimensions.get('window');

// Define the route params type
type OrderSuccessRouteParams = {
  orderNumber: string;
  estimatedDelivery: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    email: string;
  };
  orderSummary: {
    totalItems: number;
    totalAmount: number;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  };
  orderDate: string;
};

const OrderSuccessScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {colors} = useTheme();

  // Get data from navigation params
  const params = route.params as OrderSuccessRouteParams;

  const [checkmarkAnimation] = useState(new Animated.Value(0));
  const [contentAnimation] = useState(new Animated.Value(0));
  const [confettiAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate checkmark
    Animated.sequence([
      Animated.timing(checkmarkAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate confetti
    Animated.loop(
      Animated.sequence([
        Animated.timing(confettiAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(confettiAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const checkmarkScale = checkmarkAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.2, 1],
  });

  const contentOpacity = contentAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const contentTranslateY = contentAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  const confettiRotate = confettiAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const ConfettiPiece = ({style}: {style: any}) => (
    <Animated.View
      style={[
        styles.confetti,
        style,
        {
          transform: [{rotate: confettiRotate}],
        },
      ]}
    />
  );

  const handleContinueShopping = () => {
    // Navigate back to shop or home screen
    navigation.navigate('MainTabs' as never); // Replace with your actual home screen name
  };

  const handleTrackOrder = () => {};

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.backgroundDefault}]}>
      {/* Confetti Animation */}
      <View style={styles.confettiContainer}>
        <ConfettiPiece
          style={[styles.confetti1, {backgroundColor: '#FFD700'}]}
        />
        <ConfettiPiece
          style={[styles.confetti2, {backgroundColor: '#FF6B6B'}]}
        />
        <ConfettiPiece
          style={[styles.confetti3, {backgroundColor: '#4ECDC4'}]}
        />
        <ConfettiPiece
          style={[styles.confetti4, {backgroundColor: '#45B7D1'}]}
        />
        <ConfettiPiece
          style={[styles.confetti5, {backgroundColor: '#96CEB4'}]}
        />
        <ConfettiPiece
          style={[styles.confetti6, {backgroundColor: '#FFEAA7'}]}
        />
      </View>

      {/* Success Checkmark */}
      <View style={styles.checkmarkContainer}>
        <Animated.View
          style={[
            styles.checkmarkCircle,
            {
              backgroundColor: '#4CAF50',
              transform: [{scale: checkmarkScale}],
            },
          ]}>
          <Text style={styles.checkmarkText}>✓</Text>
        </Animated.View>
      </View>

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: contentOpacity,
            transform: [{translateY: contentTranslateY}],
          },
        ]}>
        <Text style={[styles.title, {color: colors.textPrimary}]}>
          Order Placed Successfully!
        </Text>

        <Text style={[styles.subtitle, {color: colors.orderDate}]}>
          Thank you {params?.customerInfo?.name || 'valued customer'} for your
          purchase. We're preparing your order with care.
        </Text>

        {/* Order Details Card */}
        <View
          style={[styles.orderCard, {backgroundColor: colors.backgroundCard}]}>
          <View style={styles.orderRow}>
            <Text style={[styles.orderLabel, {color: colors.orderDate}]}>
              Order Number
            </Text>
            <Text style={[styles.orderValue, {color: colors.textPrimary}]}>
              {params?.orderNumber || 'ORD-2024-001234'}
            </Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={[styles.orderLabel, {color: colors.orderDate}]}>
              Order Date
            </Text>
            <Text style={[styles.orderValue, {color: colors.textPrimary}]}>
              {params?.orderDate || new Date().toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={[styles.orderLabel, {color: colors.orderDate}]}>
              Estimated Delivery
            </Text>
            <Text style={[styles.orderValue, {color: colors.textPrimary}]}>
              {params?.estimatedDelivery || '3-5 business days'}
            </Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={[styles.orderLabel, {color: colors.orderDate}]}>
              Total Amount
            </Text>
            <Text style={[styles.orderValue, {color: colors.textPrimary}]}>
              ৳{params?.orderSummary?.totalAmount?.toFixed(2) || '0.00'}
            </Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={[styles.orderLabel, {color: colors.orderDate}]}>
              Status
            </Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={[styles.statusText, {color: '#4CAF50'}]}>
                Confirmed
              </Text>
            </View>
          </View>
        </View>

        {/* Customer Info Card */}
        <View
          style={[styles.orderCard, {backgroundColor: colors.backgroundCard}]}>
          <Text style={[styles.sectionTitle, {color: colors.textPrimary}]}>
            Delivery Information
          </Text>

          <View style={styles.orderRow}>
            <Text style={[styles.orderLabel, {color: colors.orderDate}]}>
              Name
            </Text>
            <Text style={[styles.orderValue, {color: colors.textPrimary}]}>
              {params?.customerInfo?.name || 'N/A'}
            </Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={[styles.orderLabel, {color: colors.orderDate}]}>
              Phone
            </Text>
            <Text style={[styles.orderValue, {color: colors.textPrimary}]}>
              {params?.customerInfo?.phone || 'N/A'}
            </Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={[styles.orderLabel, {color: colors.orderDate}]}>
              Address
            </Text>
            <Text style={[styles.orderValue, {color: colors.textPrimary}]}>
              {params?.customerInfo?.address || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, {backgroundColor: '#E3F2FD'}]}>
              <Text style={styles.featureIconText}>📦</Text>
            </View>
            <Text style={[styles.featureText, {color: colors.orderDate}]}>
              Secure Packaging
            </Text>
          </View>

          <View style={styles.feature}>
            <View style={[styles.featureIcon, {backgroundColor: '#E8F5E8'}]}>
              <Text style={styles.featureIconText}>🚚</Text>
            </View>
            <Text style={[styles.featureText, {color: colors.orderDate}]}>
              Fast Delivery
            </Text>
          </View>

          <View style={styles.feature}>
            <View style={[styles.featureIcon, {backgroundColor: '#FFF3E0'}]}>
              <Text style={styles.featureIconText}>🔒</Text>
            </View>
            <Text style={[styles.featureText, {color: colors.orderDate}]}>
              Secure Payment
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          {/* <TouchableOpacity
            style={[
              styles.primaryButton,
              {backgroundColor: colors.textPrimary},
            ]}
            onPress={handleTrackOrder}>
            <Text style={styles.primaryButtonText}>Track Your Order</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[styles.secondaryButton, {borderColor: colors.textPrimary}]}
            onPress={handleContinueShopping}>
            <Text
              style={[styles.secondaryButtonText, {color: colors.textPrimary}]}>
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Message */}
        <Text style={[styles.footerText, {color: colors.orderDate}]}>
          You'll receive an email confirmation at{' '}
          {params?.customerInfo?.email || 'your email'} shortly.
        </Text>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    zIndex: 1,
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  confetti1: {top: 100, left: width * 0.1},
  confetti2: {top: 150, right: width * 0.2},
  confetti3: {top: 200, left: width * 0.3},
  confetti4: {top: 120, right: width * 0.4},
  confetti5: {top: 180, left: width * 0.6},
  confetti6: {top: 140, right: width * 0.1},
  checkmarkContainer: {
    alignItems: 'center',
    marginTop: height * 0.15,
    marginBottom: 40,
    zIndex: 2,
  },
  checkmarkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmarkText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  orderCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    marginBottom: 12,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderLabel: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    flex: 1,
  },
  orderValue: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    flex: 1,
    textAlign: 'right',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fontFamily.medium,
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
  footerText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default OrderSuccessScreen;

// Navigation Types (add this to your navigation types file)
export type RootStackParamList = {
  OrderReview: undefined;
  OrderSuccessScreen: {
    orderNumber: string;
    estimatedDelivery: string;
    customerInfo: {
      name: string;
      phone: string;
      address: string;
      email: string;
    };
    orderSummary: {
      totalItems: number;
      totalAmount: number;
      items: Array<{
        name: string;
        quantity: number;
        price: number;
      }>;
    };
    orderDate: string;
  };
  Home: undefined;
  TrackOrder: {
    orderNumber: string;
  };
  // Add other screens as needed
};
