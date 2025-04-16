import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CoffeeItem} from '../../types/types';

interface FavoritesState {
  favorites: CoffeeItem[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<CoffeeItem>) => {
      const coffeeItem = action.payload;
      const existingIndex = state.favorites.findIndex(
        item => item.id === coffeeItem.id,
      );

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(coffeeItem);
      }
    },
    clearAllFavorites: state => {
      state.favorites = [];
    },
  },
});

export const {toggleFavorite, clearAllFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;
