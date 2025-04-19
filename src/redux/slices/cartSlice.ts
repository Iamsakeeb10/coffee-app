import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  coffeeId: string;
  name: string;
  subtitle: string;
  imageURL: string;
  size: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Create a unique id for the cart item based on coffee id and size
      const cartItemId = `${action.payload.coffeeId}_${action.payload.size}`;

      // Check if the item with the same coffee id and size already exists
      const existingItemIndex = state.items.findIndex(
        item => item.id === cartItemId,
      );

      if (existingItemIndex >= 0) {
        // If item exists, increase quantity
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // If item doesn't exist, add it with the generated ID
        state.items.push({
          ...action.payload,
          id: cartItemId,
        });
      }

      // Recalculate the total amount
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      // Recalculate the total amount
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalAmount += item.price;
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalAmount -= item.price;
        }
      }
    },

    clearCart: state => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
