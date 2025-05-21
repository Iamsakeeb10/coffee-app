import {CartItem} from '../Redux/cartSlice.type';

export interface GroupedCartItem {
  name: string;
  subtitle: string;
  imageURL: string;
  sizes: CartItem[];
  useGroupedView?: boolean;
}
