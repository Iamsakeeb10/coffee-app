import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../utils/typography';

const {width} = Dimensions.get('window');

const CartEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color={styles.emptyIcon.color} />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Start exploring and add your favorite items!
      </Text>
    </View>
  );
};

export default CartEmpty;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  emptyIcon: {
    color: colors.gray,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: fontFamily.medium,
    color: colors.emptyFavTitle,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.emptyFavSubTitle,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    paddingHorizontal: 32,
    width: width * 0.8,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
});
