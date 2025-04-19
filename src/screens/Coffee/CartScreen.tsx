// CartScreen.tsx - Modified version
import React, {useLayoutEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CartEmpty from '../../components/Coffee/CartEmpty';
import {renderAlertMessage} from '../../components/Common/AlertMessage';
import CustomAlert from '../../components/Common/CustomAlert';
import {colors} from '../../constants/colors';
import {
  CartItem,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../redux/slices/cartSlice';
import {AppDispatch, RootState} from '../../redux/store/store';
import {cartStyles} from '../../styles/cartStyles';
import {RootStackParamList} from '../../types/types';
import {showSnack} from '../../utils/Snack';

const CartScreen = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [isForAllItems, setIsForAllItems] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const {items, totalAmount} = useSelector((state: RootState) => state.cart);
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleClearCartPress = () => {
    if (items.length === 0) {
      showSnack('Cart is already empty', {
        backgroundColor: colors.deepRed,
        textColor: colors.white,
        actionText: 'Okay',
        actionColor: colors.white,
      });
      return;
    }

    setSelectedItem(null);
    setIsForAllItems(true);
    setShowAlert(true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        items.length > 0 ? (
          <Pressable
            onPress={handleClearCartPress}
            style={({pressed}) => ({
              opacity: pressed ? 0.5 : 1,
              marginRight: 16,
            })}>
            <Ionicons name="trash-outline" size={22} color={colors.white} />
          </Pressable>
        ) : null,
    });
  }, [navigation, items.length]);

  const handleIncrement = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: string, quantity: number) => {
    if (quantity > 1) {
      dispatch(decrementQuantity(id));
    } else {
      setSelectedItem(items.find(item => item.id === id) || null);
      setIsForAllItems(false);
      setShowAlert(true);
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    setTimeout(() => {
      showSnack(`${selectedItem?.name} removed from cart`, {
        backgroundColor: colors.deepRed,
        textColor: colors.white,
        actionText: 'Okay',
        actionColor: colors.white,
      });
    }, 150);
  };

  const handleCheckout = () => {
    showSnack('Checkout functionality will be implemented soon', {
      backgroundColor: colors.background,
      textColor: colors.white,
      actionText: 'Okay',
      actionColor: colors.circle,
      duration: 1200,
    });
  };

  if (items.length === 0) {
    return <CartEmpty />;
  }

  const alertTitle = isForAllItems ? 'Clear Cart' : 'Remove Item';
  const alertMessage = renderAlertMessage(
    isForAllItems,
    selectedItem?.name,
    selectedItem?.size,
  );

  return (
    <View style={cartStyles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        contentContainerStyle={cartStyles.listContent}
        renderItem={({item}) => (
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
                  onPress={() => handleDecrement(item.id, item.quantity)}
                  style={cartStyles.quantityButton}>
                  <Ionicons name="remove" size={20} color={colors.white} />
                </Pressable>
                <View style={cartStyles.quantityBadge}>
                  <Text style={cartStyles.quantityText}>{item.quantity}</Text>
                </View>

                <Pressable
                  onPress={() => handleIncrement(item.id)}
                  style={cartStyles.quantityButton}>
                  <Ionicons name="add" size={20} color={colors.white} />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      <View style={[cartStyles.footer, {paddingVertical: insets.bottom + 15}]}>
        <View style={cartStyles.priceContainer}>
          <Text style={[cartStyles.descriptionTitle, cartStyles.priceText]}>
            Total Price
          </Text>
          <View style={cartStyles.row}>
            <Text style={cartStyles.dollarSign}>$</Text>
            <Text style={cartStyles.price}>{totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        <Pressable style={cartStyles.payButtonFull} onPress={handleCheckout}>
          <Text style={cartStyles.cartText}>Pay</Text>
        </Pressable>
      </View>

      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          message={alertMessage}
          confirmText="Okay"
          cancelText="Cancel"
          confirmBgColor={colors.deepRed}
          onCancel={() => {
            setShowAlert(false);
            setSelectedItem(null);
          }}
          onConfirm={() => {
            if (isForAllItems) {
              dispatch(clearCart());
              setTimeout(() => {
                showSnack('All coffee items removed from cart', {
                  backgroundColor: colors.deepRed,
                  textColor: colors.white,
                  actionText: 'Okay',
                  actionColor: colors.white,
                });
              }, 150);
            } else if (selectedItem) {
              handleRemove(selectedItem.id);
            }
            setShowAlert(false);
          }}
        />
      )}
    </View>
  );
};

export default CartScreen;
