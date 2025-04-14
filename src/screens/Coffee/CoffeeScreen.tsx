import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, StatusBar, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import CategoryList from '../../components/Coffee/CategorySelector';
import {CoffeeList} from '../../components/Coffee/CoffeeList';
import EmptyComponent from '../../components/Coffee/EmptyComponent';
import IconButton from '../../components/Common/IconButton';
import InputLocal from '../../components/Common/InputLocal';
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
  const [searchQuery, setSearchQuery] = useState('');
  const listRef = useRef<FlatList | null | any>(null);

  const insets = useSafeAreaInsets();

  const dispatch = useDispatch<AppDispatch>();

  const filteredItems = coffeeItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (!loading && firstLoad) {
      setFirstLoad(false);
    }
  }, [loading, firstLoad]);

  useEffect(() => {
    if (!listRef.current) return;

    if (
      listRef.current &&
      filteredItems.length > 0 &&
      searchQuery.trim() !== ''
    ) {
      const bestMatchIndex = filteredItems.findIndex(item =>
        item.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );

      const scrollToIndex = bestMatchIndex !== -1 ? bestMatchIndex : 0;

      listRef.current?.scrollToIndex({
        animated: true,
        index: scrollToIndex,
        viewPosition: 0.5,
      });
    } else {
      listRef.current?.scrollToIndex({
        animated: true,
        index: 0,
        viewPosition: 0.5,
      });
    }
  }, [searchQuery, filteredItems]);

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
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={[styles.flatlistContainer]}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Find the best coffee for you</Text>
          <IconButton
            onPress={logoutHandler}
            iconName="log-out"
            style={styles.logoutStyle}
          />
        </View>
        <View style={styles.filterInputContainer}>
          <InputLocal
            placeholder="Find Your Coffee..."
            textColor={colors.inputTextColor}
            value={searchQuery}
            onChange={setSearchQuery}
            customStyle={styles.filterInput}
          />
          <IconButton
            iconName="search"
            iconSize={16}
            iconColor={colors.muted}
            activeOpacity={1}
            style={styles.filterIcon}
          />
        </View>

        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {filteredItems.length === 0 && searchQuery.trim() !== '' ? (
          <EmptyComponent />
        ) : (
          <CoffeeList ref={listRef} data={filteredItems} loading={loading} />
        )}
      </View>
    </View>
  );
};

export default CoffeeScreen;
