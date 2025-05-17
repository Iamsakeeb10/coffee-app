import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCartFromFirestore} from '../firebase/service/cartService';
import {setCart} from '../redux/slices/cartSlice';
import {RootState} from '../redux/store/store';

const useSyncCart = () => {
  const dispatch = useDispatch();
  const [hasSynced, setHasSynced] = useState(false);

  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user && !hasSynced) {
        const firestoreCart = await fetchCartFromFirestore(user.uid);

        if (items.length === 0) {
          dispatch(setCart(firestoreCart));
        }

        setHasSynced(true);
      }
    });

    return unsubscribe;
  }, [items, hasSynced]);
};

export default useSyncCart;
