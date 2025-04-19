import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {CartItem} from '../../redux/slices/cartSlice';
import {cartStyles} from '../../styles/cartStyles';

interface SingleSizeCartItemProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string, quantity: number) => void;
}

const SingleSizeCartItem: React.FC<SingleSizeCartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={cartStyles.cartItem}>
      <Image
        source={{uri: item.imageURL}}
        style={cartStyles.itemImage}
        resizeMode="cover"
      />

      <View style={cartStyles.itemDetails}>
        <View>
          <Text style={cartStyles.itemName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={cartStyles.itemSubtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>

          <View style={cartStyles.sizePriceRow}>
            <View style={cartStyles.sizeButton}>
              <Text style={cartStyles.sizeText}>{item.size}</Text>
            </View>
            <View style={cartStyles.priceValueRow}>
              <Text style={cartStyles.itemPriceDollar}>$</Text>
              <Text style={cartStyles.itemPriceValue}>
                {item.price.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={cartStyles.quantityContainer}>
          <Pressable
            onPress={() => onDecrement(item.id, item.quantity)}
            style={({pressed}) => [
              {opacity: pressed ? 0.5 : 1},
              cartStyles.quantityButton,
            ]}>
            <Ionicons name="remove" size={20} color={colors.white} />
          </Pressable>
          <View style={cartStyles.quantityBadge}>
            <Text style={cartStyles.quantityText}>{item.quantity}</Text>
          </View>

          <Pressable
            onPress={() => onIncrement(item.id)}
            style={({pressed}) => [
              {opacity: pressed ? 0.5 : 1},
              cartStyles.quantityButton,
            ]}>
            <Ionicons name="add" size={20} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SingleSizeCartItem;
