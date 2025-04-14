import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constants/colors';
import styles from '../../styles/coffeeScreenStyle';

interface Props {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategoryList: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <FlatList
      data={categories}
      horizontal
      keyExtractor={item => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingVertical: 12}}
      ItemSeparatorComponent={() => <View style={{width: 12}} />}
      renderItem={({item}) => (
        <TouchableOpacity
          hitSlop={{top: 50, bottom: 50, left: 0, right: 0}}
          onPress={() => onSelect(item)}
          style={{transform: [{scale: selectedCategory === item ? 1.05 : 1}]}}>
          <Text
            style={[
              {
                color: selectedCategory === item ? colors.circle : colors.muted,
              },
              styles.categoryItem,
            ]}>
            {item}
          </Text>
          {selectedCategory === item && <View style={styles.circle} />}
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryList;
