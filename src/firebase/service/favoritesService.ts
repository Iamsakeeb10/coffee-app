import firestore from '@react-native-firebase/firestore';
import {CoffeeItem} from '../../types/types';

export const saveFavoriteToFirestore = async (
  userId: string,
  coffeeItem: CoffeeItem,
) => {
  console.log(`Saving favorite for user ${userId}:`, coffeeItem);
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('favorites')
      .doc(coffeeItem.id.toString())
      .set(coffeeItem);
    console.log('Favorite saved to Firestore');
  } catch (error) {
    console.error('Error saving favorite:', error);
  }
  console.log('Favorite saved');
};

export const removeFavoriteFromFirestore = async (
  userId: string,
  coffeeItemId: string,
) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('favorites')
    .doc(coffeeItemId)
    .delete();
};

export const fetchFavoritesFromFirestore = async (
  userId: string,
): Promise<CoffeeItem[]> => {
  const snapshot = await firestore()
    .collection('users')
    .doc(userId)
    .collection('favorites')
    .get();

  return snapshot.docs.map(doc => doc.data() as CoffeeItem);
};
