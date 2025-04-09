import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import CategoryList from '../../components/Coffee/CategorySelector';
import CoffeeList from '../../components/Coffee/CoffeeList';
import IconButton from '../../components/Common/IconButton';
import {colors} from '../../constants/colors';
import {useCoffeeItems} from '../../hooks/useCoffeeItems';
import {AppDispatch} from '../../redux/store/store';
import {logoutUser} from '../../redux/thunks/authThunks';
import styles from '../../styles/coffeeScreenStyle';
import {showSnack} from '../../utils/Snack';

const categories = [
  'All',
  'Cappuccino',
  'Espresso',
  'Latte',
  'Cold Brew',
  'Mocha',
];

const CoffeeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [firstLoad, setFirstLoad] = useState(true);

  const {coffeeItems, loading} = useCoffeeItems(selectedCategory);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!loading && firstLoad) {
      setFirstLoad(false);
    }
  }, [loading, firstLoad]);

  const logoutHandler = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      showSnack('Logged out successfully', {
        duration: 3000,
        backgroundColor: colors.background,
        textColor: colors.white,
        actionText: 'Okay',
        actionColor: colors.circle,
      });
    } catch (error) {
      showSnack('Logout failed', {
        duration: 3000,
        backgroundColor: colors.btnRed,
        textColor: colors.white,
      });
    }
  };

  if (firstLoad && loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.circle} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatlistContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Find the best coffee for you</Text>
          <IconButton
            onPress={logoutHandler}
            iconName="log-out"
            style={styles.logoutStyle}
          />
        </View>

        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <CoffeeList data={coffeeItems} loading={loading} />
      </View>
    </View>
  );
};

export default CoffeeScreen;
