import React from 'react';
import {Text} from 'react-native';
import {getFullSize} from '../../utils/helpers';
import {fontFamily} from '../../utils/typography';

export const renderAlertMessage = (
  isForAllItems: boolean,
  itemName?: string,
  itemSize?: string,
) => {
  if (isForAllItems) {
    return 'This will remove all items from your cart.';
  }

  const formattedName = itemName?.toUpperCase() ?? 'ITEM';
  const formattedSize = getFullSize(itemSize ?? 'default').toUpperCase();

  return (
    <Text>
      This will remove{' '}
      <Text style={{fontFamily: fontFamily.medium}}>{formattedName}</Text>{' '}
      <Text style={{fontFamily: fontFamily.medium}}>{formattedSize}</Text> from
      your cart.
    </Text>
  );
};
