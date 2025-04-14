import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants/colors';

const CartScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#fff',
        }}>
        CartScreen
      </Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
