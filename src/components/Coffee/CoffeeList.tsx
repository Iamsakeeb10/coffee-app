import React, {forwardRef} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {CoffeeItem} from '../../types/types';
import CoffeeCard from './CoffeeCard';

interface Props {
  data: CoffeeItem[];
  loading: boolean;
}

const {width} = Dimensions.get('window');
const itemWidth = width * 0.4;

export const CoffeeList = forwardRef<FlatList<CoffeeItem>, Props>(
  ({data, loading}, ref) => {
    return (
      <FlatList
        ref={ref}
        data={data}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{marginRight: -12}}
        ItemSeparatorComponent={() => <View style={{width: 12}} />}
        getItemLayout={(_, index) => ({
          length: itemWidth + 12,
          offset: (itemWidth + 12) * index,
          index,
        })}
        renderItem={({item, index}) => (
          <CoffeeCard item={item} loading={loading} index={index} />
        )}
      />
    );
  },
);
