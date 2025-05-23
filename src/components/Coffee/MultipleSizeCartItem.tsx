import React from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../hooks/useTheme';
import {CartItem} from '../../redux/slices/cartSlice';
import {cartStyles} from '../../styles/cartStyles';
import {widthPercent} from '../../utils/dimensions';

interface MultipleSizeCartItemProps {
  group: {
    name: string;
    subtitle: string;
    imageURL: string;
    sizes: CartItem[];
  };
  onIncrement: (id: string) => void;
  onDecrement: (id: string, quantity: number) => void;
  readOnly?: boolean;
}

const {width} = Dimensions.get('window');

const MultipleSizeCartItem: React.FC<MultipleSizeCartItemProps> = ({
  group,
  onIncrement,
  onDecrement,
  readOnly,
}) => {
  const {colors} = useTheme();

  return (
    <View style={cartStyles.groupCartItem}>
      <View style={cartStyles.groupItemHeader}>
        <Image
          source={{uri: group.imageURL}}
          style={{
            height: readOnly ? widthPercent(37) : width * 0.37,
            width: width * 0.35,
            borderRadius: 20,
          }}
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
          <View
            style={[
              cartStyles.groupSizeInfo,
              readOnly && {
                flex: 1,
                justifyContent: 'space-between',
              },
            ]}>
            <View
              style={[
                cartStyles.sizeButton,
                {
                  backgroundColor: colors.backgroundDefault,
                  flex: readOnly ? 1 : undefined,
                },
              ]}>
              <Text style={cartStyles.sizeText}>{sizeItem.size}</Text>
            </View>
            <View style={cartStyles.priceValueRow}>
              <Text style={cartStyles.itemPriceDollar}>$</Text>
              <Text style={cartStyles.itemPriceValue}>
                {sizeItem.price.toFixed(2)}
              </Text>
            </View>
          </View>

          {!readOnly && (
            <View style={[cartStyles.quantityContainer, {gap: 12}]}>
              <Pressable
                onPress={() => onDecrement(sizeItem.id, sizeItem.quantity)}
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
                    {color: colors.textPrimary},
                  ]}>
                  {sizeItem.quantity}
                </Text>
              </View>

              <Pressable
                onPress={() => onIncrement(sizeItem.id)}
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
      ))}
    </View>
  );
};

export default MultipleSizeCartItem;
