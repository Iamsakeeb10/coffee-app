import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {CartItem} from '../../redux/slices/cartSlice';
import {cartStyles} from '../../styles/cartStyles';

interface MultipleSizeCartItemProps {
  group: {
    name: string;
    subtitle: string;
    imageURL: string;
    sizes: CartItem[];
  };
  onIncrement: (id: string) => void;
  onDecrement: (id: string, quantity: number) => void;
}

const MultipleSizeCartItem: React.FC<MultipleSizeCartItemProps> = ({
  group,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={cartStyles.groupCartItem}>
      <View style={cartStyles.groupItemHeader}>
        <Image
          source={{uri: group.imageURL}}
          style={cartStyles.groupItemImage}
          resizeMode="cover"
        />
        <View style={cartStyles.groupItemInfo}>
          <Text style={cartStyles.itemName} numberOfLines={1}>
            {group.name}
          </Text>
          <Text style={cartStyles.itemSubtitle} numberOfLines={1}>
            {group.subtitle}
          </Text>
        </View>
      </View>

      {group.sizes.map(sizeItem => (
        <View key={sizeItem.id} style={cartStyles.groupSizeRow}>
          <View style={cartStyles.groupSizeInfo}>
            <View style={cartStyles.sizeButton}>
              <Text style={cartStyles.sizeText}>{sizeItem.size}</Text>
            </View>
            <View style={cartStyles.priceValueRow}>
              <Text style={cartStyles.itemPriceDollar}>$</Text>
              <Text style={cartStyles.itemPriceValue}>
                {sizeItem.price.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={[cartStyles.quantityContainer, {gap: 12}]}>
            <Pressable
              onPress={() => onDecrement(sizeItem.id, sizeItem.quantity)}
              style={({pressed}) => [
                {opacity: pressed ? 0.5 : 1},
                cartStyles.quantityButton,
              ]}>
              <Ionicons name="remove" size={20} color={colors.white} />
            </Pressable>
            <View style={cartStyles.quantityBadge}>
              <Text style={cartStyles.quantityText}>{sizeItem.quantity}</Text>
            </View>

            <Pressable
              onPress={() => onIncrement(sizeItem.id)}
              style={({pressed}) => [
                {opacity: pressed ? 0.5 : 1},
                cartStyles.quantityButton,
              ]}>
              <Ionicons name="add" size={20} color={colors.white} />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MultipleSizeCartItem;
