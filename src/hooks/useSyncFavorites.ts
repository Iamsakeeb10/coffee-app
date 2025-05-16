import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFavoritesFromFirestore} from '../firebase/service/favoritesService';
import {setFavorites} from '../redux/slices/favoritesSlice';
import {RootState} from '../redux/store/store';

const useSyncFavorites = () => {
  const dispatch = useDispatch();
  const [hasSynced, setHasSynced] = useState(false);

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user && !hasSynced) {
        const firestoreFavorites = await fetchFavoritesFromFirestore(user.uid);

        if (favorites.length === 0) {
          dispatch(setFavorites(firestoreFavorites));
        }

        setHasSynced(true);
      }
    });

    return unsubscribe;
  }, [favorites, hasSynced]);
};

export default useSyncFavorites;
