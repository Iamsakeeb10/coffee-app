import React from 'react';
import {Text, View} from 'react-native';
import {spacing} from '../../constants/spacing';
import {useTheme} from '../../hooks/useTheme';
import {useTranslation} from '../../i18n/useTranslations';
import styles from '../../styles/coffeeBeans.style';
import {CoffeeBeansProps} from '../../types/Coffee/CoffeeBeans.type';
import {heightPercent} from '../../utils/dimensions';
import EmptyState from '../Common/EmptyState';
import {CoffeeList} from './CoffeeList';

const CoffeeBeans: React.FC<CoffeeBeansProps> = ({
  coffeeBeans,
  loading,
  hasRegularProducts,
}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  if (!hasRegularProducts && coffeeBeans.length === 0) {
    return null;
  }

  return (
    <View style={{marginTop: spacing.spacing16, minHeight: heightPercent(30)}}>
      {coffeeBeans.length > 0 ? (
        <View>
          <Text style={[styles.featuredTitle, {color: colors.screenTitle}]}>
            Coffee beans
          </Text>
          <CoffeeList data={coffeeBeans} loading={loading} />
        </View>
      ) : (
        hasRegularProducts && (
          <View
            style={{
              minHeight: heightPercent(20),
            }}>
            <EmptyState
              iconName="flame-outline"
              title="No coffee beans at the moment"
              titleStyle={[
                styles.emptyStateTitleStyle,
                {
                  color: colors.gray500,
                },
              ]}
              iconSize={40}
            />
          </View>
        )
      )}
    </View>
  );
};

export default CoffeeBeans;
