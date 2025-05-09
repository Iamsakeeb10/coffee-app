import React from 'react';
import {Animated, Dimensions, View} from 'react-native';
import styles from '../../styles/coffeeScreenStyle';

const {width, height} = Dimensions.get('window');

const SkeletonLoader = () => {
  return (
    <Animated.View
      style={[styles.coffeeItemContainer, styles.skeletonRootContainer]}>
      <View style={styles.skeletonImage} />

      <View style={styles.skeletonTitle} />

      <View style={[styles.skeletonDescription, {marginTop: 6}]} />

      <View style={styles.skeletonPriceContainer}>
        <View style={styles.skeletonPrice} />

        <View style={styles.skeletonCardBottom} />
      </View>
    </Animated.View>
  );
};

export default SkeletonLoader;
