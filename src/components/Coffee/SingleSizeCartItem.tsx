import React from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../hooks/useTheme';
import {CartItem} from '../../redux/slices/cartSlice';
import {cartStyles} from '../../styles/cartStyles';
import {widthPercent} from '../../utils/dimensions';

interface SingleSizeCartItemProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string, quantity: number) => void;
  readOnly?: boolean;
}

const {width} = Dimensions.get('window');

const SingleSizeCartItem: React.FC<SingleSizeCartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  readOnly,
}) => {
  const {colors} = useTheme();

  return (
    <View style={cartStyles.cartItem}>
      <Image
        source={{uri: item.imageURL}}
        style={{
          height: readOnly ? widthPercent(37) : '100%',
          width: width * 0.35,
          borderRadius: 20,
        }}
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

        {!readOnly && (
          <View style={cartStyles.quantityContainer}>
            <Pressable
              onPress={() => onDecrement(item.id, item.quantity)}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  backgroundColor: colors.accentCircle,
                },
                cartStyles.quantityButton,
              ]}>
              <Ionicons name="remove" size={20} color={colors.white} />
            </Pressable>
            <View
              style={[
                cartStyles.quantityBadge,
                {
                  backgroundColor: colors.backgroundDefault,
                  borderColor: colors.accentCircle,
                },
              ]}>
              <Text
                style={[
                  cartStyles.quantityText,
                  {
                    color: colors.textPrimary,
                  },
                ]}>
                {item.quantity}
              </Text>
            </View>

            <Pressable
              onPress={() => onIncrement(item.id)}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  backgroundColor: colors.accentCircle,
                },
                cartStyles.quantityButton,
              ]}>
              <Ionicons name="add" size={20} color={colors.white} />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default SingleSizeCartItem;
