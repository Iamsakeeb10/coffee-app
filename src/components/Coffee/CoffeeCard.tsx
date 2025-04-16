import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Image, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import styles from '../../styles/coffeeScreenStyle';
import {CoffeeItem} from '../../types/types';
import {animateCard} from '../../utils/animations';
import SkeletonLoader from './SkeletonLoader';

const {width, height} = Dimensions.get('window');
const itemWidth = width * 0.4;

interface Props {
  item: CoffeeItem;
  loading: boolean;
  index?: number;
}

const CoffeeCard: React.FC<Props> = ({item, loading, index = 0}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!loading) {
      animateCard(opacity, translateY, scale, index);
    } else {
      opacity.setValue(0);
      translateY.setValue(20);
      scale.setValue(0.95);
    }
  }, [loading, opacity, translateY, scale, index]);

  const goToDetail = () => {
    navigation.navigate('CoffeeDetailScreen', {item, readonly: true});
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <Animated.View
        style={[
          styles.coffeeItemContainer,
          {
            opacity,
            transform: [{translateY}, {scale}],
          },
        ]}>
        <View style={styles.details}>
          <Pressable
            onPress={goToDetail}
            style={[
              styles.imageContainer,
              {
                width: itemWidth,
                height: height * 0.33,
              },
            ]}>
            <View style={styles.imageInnerContainer}>
              {item.imageURL && (
                <Image source={{uri: item.imageURL}} style={styles.image} />
              )}
            </View>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.subtitle}</Text>
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
    </>
  );
};

export default CoffeeCard;
