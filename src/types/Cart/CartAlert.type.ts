import {CartItem} from '../Redux/cartSlice.type';

export interface CartAlertProps {
  visible: boolean;
  isForAllItems: boolean;
  selectedItem: CartItem | null;
  onCancel: () => void;
  onConfirm: () => void;
}
