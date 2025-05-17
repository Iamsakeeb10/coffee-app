import React from 'react';
import {Text} from 'react-native';
import {getFullSize} from '../../utils/helpers';
import {fontFamily} from '../../utils/typography';

export const renderAlertMessage = (
  t: (key: string) => string, // pass translation function as argument
  isForAllItems: boolean,
  itemName?: string,
  itemSize?: string,
) => {
  if (isForAllItems) {
    return <Text>{t('cart.removeAllConfirmation')}</Text>;
  }

  const formattedName = itemName?.toUpperCase() ?? 'ITEM';
  const formattedSize = getFullSize(itemSize ?? 'default').toUpperCase();

  return (
    <Text>
      {t('cart.removeText')}{' '}
      <Text style={{fontFamily: fontFamily.medium}}>{formattedName}</Text>{' '}
      <Text style={{fontFamily: fontFamily.medium}}>{formattedSize}</Text>{' '}
      {t('cart.fromCart')}
    </Text>
  );
};
