import React from 'react';
import {FlatList, View} from 'react-native';
import {CoffeeItem} from '../../types/types';
import CoffeeCard from './CoffeeItem';

interface Props {
  data: CoffeeItem[];
  loading: boolean;
}

const CoffeeList: React.FC<Props> = ({data, loading}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      horizontal
      contentContainerStyle={{marginRight: -12}}
      ItemSeparatorComponent={() => <View style={{width: 12}} />}
      renderItem={({item}) => <CoffeeCard item={item} loading={loading} />}
    />
  );
};

export default CoffeeList;
