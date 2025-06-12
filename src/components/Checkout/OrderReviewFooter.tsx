import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import {useTheme} from '../../hooks/useTheme';
import {fontFamily} from '../../utils/typography';

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
          <Text style={[styles.infoText, {color: colors.textPrimary}]}>
            Products: {items}
          </Text>
          <Text style={[styles.infoText, {color: colors.textPrimary}]}>
            Total: $ {total.toFixed(2)}
          </Text>
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
  },

  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderColor: 'rgba(255,255,255,0.4)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  infoText: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  placeOrderButton: {
    backgroundColor: colors.deepRed,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontFamily.bold,
  },
});

export default OrderReviewFooter;
