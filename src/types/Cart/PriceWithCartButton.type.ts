import {ProductItem} from '../Home/Home.type';

export interface PriceWithCartButtonProps {
  price: number;
  item: ProductItem;
  selectedSize: number;
}
