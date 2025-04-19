import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Image, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {colors} from '../../constants/colors';
import {addToCart} from '../../redux/slices/cartSlice';
import {AppDispatch} from '../../redux/store/store';
import styles from '../../styles/coffeeScreenStyle';
import {CoffeeItem} from '../../types/types';
import {animateCard, triggerScaleAnimation} from '../../utils/animations';
import {getFullSize} from '../../utils/helpers';
import {showSnack} from '../../utils/Snack';
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
  const scaleValue = useRef(new Animated.Value(1)).current;

  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!loading) {
      animateCard(opacity, translateY, scale, index);
    } else {
      opacity.setValue(0);
      translateY.setValue(20);
      scale.setValue(0.95);
    }
  }, [loading, opacity, translateY, scale, index]);

  const handleAddToCart = () => {
    const selectedSizeLabel = item.sizes[0];
    const price = item.priceBySize[selectedSizeLabel];

    triggerScaleAnimation(scaleValue);

    const cartItem = {
      id: '',
      coffeeId: item.id,
      name: item.name,
      subtitle: item.subtitle,
      imageURL: item.imageURL,
      size: selectedSizeLabel,
      price: price,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));

    const fullSize = getFullSize(selectedSizeLabel);
    const sizeLabel = fullSize.charAt(0).toUpperCase() + fullSize.slice(1);

    showSnack(`${sizeLabel} ${item.name} added to cart`, {
      backgroundColor: colors.background,
      textColor: 'white',
      actionText: 'Okay',
      actionColor: colors.circle,
    });
  };

  const goToDetail = () => {
    navigation.navigate('CoffeeDetailScreen', {item});
  };

  const animatedStyle = {
    transform: [{scale: scaleValue}],
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
                <Text style={styles.price}>
                  {item.priceBySize[item.sizes[0]].toFixed(2)}
                </Text>
              </View>
              <Animated.View style={[animatedStyle]}>
                <Pressable
                  onPress={handleAddToCart}
                  style={styles.cardBottomContainer}>
                  <Ionicons name="add" size={16} color={colors.white} />
                </Pressable>
              </Animated.View>
            </View>
          </Pressable>
        </View>
      </Animated.View>
    </>
  );
};

export default CoffeeCard;
