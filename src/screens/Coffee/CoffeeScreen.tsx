import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import CategoryList from '../../components/Coffee/CategorySelector';
import CoffeeList from '../../components/Coffee/CoffeeList';
import IconButton from '../../components/Common/IconButton';
import {useCoffeeItems} from '../../hooks/useCoffeeItems';
import {AppDispatch} from '../../redux/store/store';
import {logoutUser} from '../../redux/thunks/authThunks';
import styles from '../../styles/coffeeScreenStyle';

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
  const {coffeeItems, loading} = useCoffeeItems(selectedCategory);
  const dispatch = useDispatch<AppDispatch>();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color={colors.circle} />
  //     </View>
  //   );
  // }

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
