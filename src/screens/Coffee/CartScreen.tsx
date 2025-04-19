import React, {useLayoutEffect, useMemo, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CartEmpty from '../../components/Coffee/CartEmpty';
import MultipleSizeCartItem from '../../components/Coffee/MultipleSizeCartItem';
import SingleSizeCartItem from '../../components/Coffee/SingleSizeCartItem';
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

// Define a type for grouped items
interface GroupedCartItem {
  name: string;
  subtitle: string;
  imageURL: string;
  sizes: CartItem[];
}

const CartScreen = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [isForAllItems, setIsForAllItems] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const {items, totalAmount} = useSelector((state: RootState) => state.cart);
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const groupedItems = useMemo(() => {
    const groups: Record<string, GroupedCartItem> = {};

    items.forEach(item => {
      if (!groups[item.name]) {
        groups[item.name] = {
          name: item.name,
          subtitle: item.subtitle,
          imageURL: item.imageURL,
          sizes: [],
        };
      }
      groups[item.name].sizes.push(item);
    });

    return Object.values(groups).map(group => ({
      ...group,
      useGroupedView: group.sizes.length > 1,
    }));
  }, [items]);

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

  const renderSingleSizeItem = (item: CartItem) => (
    <SingleSizeCartItem
      item={item}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );

  const renderMultipleSizeItem = (
    group: GroupedCartItem & {useGroupedView: boolean},
  ) => (
    <MultipleSizeCartItem
      group={group}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );

  return (
    <View style={cartStyles.container}>
      <FlatList
        data={groupedItems}
        keyExtractor={item => item.name}
        contentContainerStyle={cartStyles.listContent}
        renderItem={({item}) =>
          item.useGroupedView
            ? renderMultipleSizeItem(item)
            : renderSingleSizeItem(item.sizes[0])
        }
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
