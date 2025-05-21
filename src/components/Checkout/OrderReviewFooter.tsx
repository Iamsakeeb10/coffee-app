import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

const OrderReviewFooter = ({items = 1, total = 470, onPlaceOrder}: any) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, {}]}>
      <View
        style={[
          styles.container,
          {width, backgroundColor: colors.backgroundCard},
        ]}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Items: {items}</Text>
          <Text style={styles.infoText}>Total: $ {total}</Text>
        </View>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={onPlaceOrder}>
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
  },

  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  placeOrderButton: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OrderReviewFooter;
