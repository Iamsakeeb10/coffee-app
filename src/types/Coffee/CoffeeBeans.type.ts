import {CoffeeItem} from '../types';

export interface CoffeeBeansProps {
  coffeeBeans: CoffeeItem[];
  loading: boolean;
  hasRegularProducts?: boolean;
}
