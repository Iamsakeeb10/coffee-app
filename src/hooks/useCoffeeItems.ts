import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {CoffeeItem} from '../types/types'; // Adjust path if needed

export const useCoffeeItems = (selectedCategory: string) => {
  const [coffeeItems, setCoffeeItems] = useState<CoffeeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> =
      firestore().collection('coffees');

    if (selectedCategory !== 'All') {
      query = query.where('category', '==', selectedCategory);
    }

    const unsubscribe = query.onSnapshot(
      snapshot => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as CoffeeItem[];
        setCoffeeItems(items);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      },
      err => {
        console.error('Error fetching coffee items:', err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [selectedCategory]);

  return {coffeeItems, loading};
};
