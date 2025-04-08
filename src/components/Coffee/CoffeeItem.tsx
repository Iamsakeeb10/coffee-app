import React from 'react';
import {Animated, Dimensions, Image, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import styles from '../../styles/coffeeScreenStyle';
import {CoffeeItem} from '../../types/types';
import SkeletonLoader from './SkeletonLoader';

const {width, height} = Dimensions.get('window');
const itemWidth = width * 0.4;

interface Props {
  item: CoffeeItem;
  loading: boolean;
}

const CoffeeCard: React.FC<Props> = ({item, loading}) => {
  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <Animated.View style={styles.coffeeItemContainer}>
      <View style={styles.details}>
        <Pressable
          style={[
            styles.imageContainer,
            {
              width: itemWidth,
              height: height * 0.35,
            },
          ]}>
          <View style={styles.imageInnerContainer}>
            {item.imageURL && (
              <Image source={{uri: item.imageURL}} style={styles.image} />
            )}
          </View>
          <View style={{flex: 0}}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>
              {item.description.split(' ').slice(0, 3).join(' ')}
            </Text>
          </View>
          <View style={styles.priceOuterContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.signStyle}>$</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <View style={styles.cardBottomContainer}>
              <Ionicons name="add" size={16} color={colors.white} />
            </View>
          </View>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default CoffeeCard;
