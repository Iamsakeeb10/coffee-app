import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, StatusBar, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import CategoryList from '../../components/Coffee/CategorySelector';
import {CoffeeList} from '../../components/Coffee/CoffeeList';
import ProfileIconButton from '../../components/Coffee/ProfileIconButton';
import SearchNotFound from '../../components/Coffee/SearchNotFound';
import IconButton from '../../components/Common/IconButton';
import InputLocal from '../../components/Common/InputLocal';
import TypingLoader from '../../components/Common/Loader';
import {colors} from '../../constants/colors';
import {useCoffeeItems} from '../../hooks/useCoffeeItems';
import {RootState} from '../../redux/store/store';
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
  const [firstLoad, setFirstLoad] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {coffeeItems, loading} = useCoffeeItems(selectedCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const listRef = useRef<FlatList | null | any>(null);

  const insets = useSafeAreaInsets();
  const {user} = useSelector((state: RootState) => state.auth);

  const filteredItems = coffeeItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (insets.top > 0 && !loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [insets.top, loading, fadeAnim]);

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

  if (firstLoad && loading) {
    return <TypingLoader size={8} color={colors.white} />;
  }

  return (
    <View style={[styles.container]}>
      <StatusBar translucent backgroundColor="transparent" />
      <Animated.View
        style={[
          styles.flatlistContainer,
          {paddingTop: insets.top + 20, opacity: fadeAnim},
        ]}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Find the best coffee for you</Text>
          <ProfileIconButton profileImage={user?.photoURL} />
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
          <SearchNotFound />
        ) : (
          <CoffeeList ref={listRef} data={filteredItems} loading={loading} />
        )}
      </Animated.View>
    </View>
  );
};

export default CoffeeScreen;
