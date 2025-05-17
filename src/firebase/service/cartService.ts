import firestore from '@react-native-firebase/firestore';
import {CartItem} from '../../redux/slices/cartSlice';

const getCartRef = (userId: string) =>
  firestore().collection('users').doc(userId).collection('cart');

export const saveCartItemToFirestore = async (
  userId: string,
  item: CartItem,
) => {
  try {
    await getCartRef(userId).doc(item.id).set(item);
  } catch (error) {
    console.error('Error saving cart item:', error);
  }
};

export const removeCartItemFromFirestore = async (
  userId: string,
  itemId: string,
) => {
  try {
    await getCartRef(userId).doc(itemId).delete();
  } catch (error) {
    console.error('Error removing cart item:', error);
  }
};

export const fetchCartFromFirestore = async (
  userId: string,
): Promise<CartItem[]> => {
  try {
    const snapshot = await getCartRef(userId).get();
    return snapshot.docs.map(doc => doc.data() as CartItem);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
};

export const clearCartFromFirestore = async (userId: string) => {
  try {
    const snapshot = await getCartRef(userId).get();
    const batch = firestore().batch();

    snapshot.docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit();
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};
