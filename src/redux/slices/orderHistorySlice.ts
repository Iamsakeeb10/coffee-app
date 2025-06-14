// types/Order/orderHistory.type.ts
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size?: string;
  imageURL?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  email: string;
}

export interface OrderHistory {
  id: string;
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  customerInfo: CustomerInfo;
  items: OrderItem[];
  totalItems: number;
  totalAmount: number;
  paymentMethod: 'cash_on_delivery' | 'card' | 'mobile_banking';
}

export interface OrderHistoryState {
  orders: OrderHistory[];
  loading: boolean;
  error: string | null;
}

// redux/slices/orderHistorySlice.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

const ORDER_HISTORY_KEY = 'order_history';

// Async thunk for fetching order history from AsyncStorage
export const fetchOrderHistory = createAsyncThunk(
  'orderHistory/fetchOrderHistory',
  async () => {
    try {
      const savedOrders = await AsyncStorage.getItem(ORDER_HISTORY_KEY);
      if (savedOrders) {
        const orders: OrderHistory[] = JSON.parse(savedOrders);
        // Sort by date (newest first)
        return orders.sort(
          (a, b) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
        );
      }
      return [];
    } catch (error) {
      console.error('Error fetching order history:', error);
      return [];
    }
  },
);

// Add new order to history and save to AsyncStorage
export const addOrderToHistory = createAsyncThunk(
  'orderHistory/addOrder',
  async (order: Omit<OrderHistory, 'id'>) => {
    try {
      const newOrder: OrderHistory = {
        ...order,
        id: Date.now().toString(),
      };

      // Get existing orders
      const savedOrders = await AsyncStorage.getItem(ORDER_HISTORY_KEY);
      const existingOrders: OrderHistory[] = savedOrders
        ? JSON.parse(savedOrders)
        : [];

      // Add new order to the beginning
      const updatedOrders = [newOrder, ...existingOrders];

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        ORDER_HISTORY_KEY,
        JSON.stringify(updatedOrders),
      );

      return newOrder;
    } catch (error) {
      console.error('Error saving order to history:', error);
      throw error;
    }
  },
);

const initialState: OrderHistoryState = {
  orders: [],
  loading: false,
  error: null,
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{id: string; status: OrderHistory['status']}>,
    ) => {
      const order = state.orders.find(order => order.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
  extraReducers: builder => {
    builder
      // Fetch order history
      .addCase(fetchOrderHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch order history';
      })
      // Add order to history
      .addCase(addOrderToHistory.pending, state => {
        state.loading = true;
      })
      .addCase(addOrderToHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload); // Add to beginning of array
      })
      .addCase(addOrderToHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add order to history';
      });
  },
});

export const {clearError, updateOrderStatus} = orderHistorySlice.actions;
export default orderHistorySlice.reducer;

// Don't forget to add this to your store
// redux/store/store.ts (add this to your existing store)
/*
  import orderHistoryReducer from '../slices/orderHistorySlice';
  
  export const store = configureStore({
    reducer: {
      // ... your existing reducers
      orderHistory: orderHistoryReducer,
    },
  });
  */
