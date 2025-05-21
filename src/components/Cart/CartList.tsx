import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CartListProps} from '../../types/Cart/CartListProps.type';
import {GroupedCartItem} from '../../types/Cart/useCart.type';
import {widthPercent} from '../../utils/dimensions';
import MultipleSizeCartItem from '../Coffee/MultipleSizeCartItem';
import SingleSizeCartItem from '../Coffee/SingleSizeCartItem';

const CartList: React.FC<CartListProps> = ({
  items,
  onIncrement,
  onDecrement,
  readOnly = false,
}) => {
  const renderItem = ({item}: {item: GroupedCartItem}) => {
    if (item.useGroupedView) {
      return (
        <MultipleSizeCartItem
          group={item}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          readOnly={readOnly}
        />
      );
    }

    return (
      <SingleSizeCartItem
        item={item.sizes[0]}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        readOnly={readOnly}
      />
    );
  };

  if (readOnly) {
    return (
      <View style={styles.listContent}>
        {items.map(item =>
          item.useGroupedView ? (
            <MultipleSizeCartItem
              key={item.name}
              group={item}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              readOnly={readOnly}
            />
          ) : (
            <SingleSizeCartItem
              key={item.sizes[0].id}
              item={item.sizes[0]}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              readOnly={readOnly}
            />
          ),
        )}
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.name}
      contentContainerStyle={styles.listContent}
      renderItem={renderItem}
    />
  );
};

export default CartList;

const styles = StyleSheet.create({
  listContent: {
    width: widthPercent(90.91),
    alignSelf: 'center',
  },
});
