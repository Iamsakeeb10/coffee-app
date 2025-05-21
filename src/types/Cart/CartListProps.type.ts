import {GroupedCartItem} from './useCart.type';

export interface CartListProps {
  items: GroupedCartItem[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string, quantity: number) => void;
  readOnly?: boolean;
}
