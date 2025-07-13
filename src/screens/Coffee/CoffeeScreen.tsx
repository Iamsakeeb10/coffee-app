import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  InteractionManager,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import CategoryList from '../../components/Coffee/CategorySelector';
import CoffeeBeans from '../../components/Coffee/CoffeeBeans';
import {CoffeeList} from '../../components/Coffee/CoffeeList';
import ProfileIconButton from '../../components/Coffee/ProfileIconButton';
import SearchNotFound from '../../components/Coffee/SearchNotFound';
import IconButton from '../../components/Common/IconButton';
import InputLocal from '../../components/Common/InputLocal';
import TypingLoader from '../../components/Common/Loader';
import {useCoffeeItems} from '../../hooks/useCoffeeItems';
import {useTheme} from '../../hooks/useTheme';
import {useTranslation} from '../../i18n/useTranslations';
import {RootState} from '../../redux/store/store';
import {NotificationService} from '../../services/notificationService';
import styles from '../../styles/coffeeScreenStyle';
import {requestNotificationPermission} from '../../utils/notificationPermissions';

const {width, height} = Dimensions.get('window');

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
  const [hasSetupNotifications, setHasSetupNotifications] = useState(false);
  const listRef = useRef<FlatList | null | any>(null);
  const hasSearchedOnce = useRef(false);

  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const {user} = useSelector((state: RootState) => state.auth);
  const {t} = useTranslation();
  const {colors, isDarkMode} = useTheme();

  const filteredItems = coffeeItems.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      item.isCoffeeBeans === false,
  );

  const filteredItemsBeans = coffeeItems.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      item.isCoffeeBeans === true,
  );

  useFocusEffect(
    useCallback(() => {
      if (!hasSetupNotifications && !loading && !firstLoad) {
        let isMounted = true;

        const interactionHandle = InteractionManager.runAfterInteractions(
          () => {
            requestAnimationFrame(() => {
              const timeoutId = setTimeout(async () => {
                try {
                  const granted = await requestNotificationPermission();
                  if (granted) {
                    await NotificationService.setupNotificationActions();
                    await NotificationService.createOrderChannel();
                    console.log('Notification setup complete ✅');
                  } else {
                    console.log('Notification permission not granted ❌');
                  }
                  if (isMounted) {
                    setHasSetupNotifications(true);
                  }
                } catch (error) {
                  console.error('Notification setup error:', error);
                  if (isMounted) {
                    setHasSetupNotifications(true);
                  }
                }
              }, 300); // short delay for smoother interaction

              // cleanup
              return () => clearTimeout(timeoutId);
            });
          },
        );

        return () => {
          isMounted = false;
          interactionHandle.cancel();
        };
      }
    }, [hasSetupNotifications, loading, firstLoad]),
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

    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery !== '') {
      hasSearchedOnce.current = true;

      const bestMatchIndex = filteredItems.findIndex(item =>
        item.name.toLowerCase().startsWith(trimmedQuery.toLowerCase()),
      );

      const scrollToIndex = bestMatchIndex !== -1 ? bestMatchIndex : 0;

      listRef.current?.scrollToIndex({
        animated: true,
        index: scrollToIndex,
        viewPosition: 0.5,
      });
    } else if (hasSearchedOnce.current) {
      listRef.current?.scrollToIndex({
        animated: true,
        index: 0,
        viewPosition: 0.5,
      });

      hasSearchedOnce.current = false;
    }
  }, [searchQuery, filteredItems]);

  if (firstLoad && loading) {
    return (
      <View style={{width, height, backgroundColor: colors.backgroundDefault}}>
        <StatusBar translucent backgroundColor="transparent" />
        <TypingLoader size={8} color={colors.textPrimary} />
      </View>
    );
  }

  const isSearchActive = searchQuery.trim() !== '';
  const hasRegularProducts = filteredItems.length > 0;
  const hasNoProducts =
    filteredItems.length === 0 && filteredItemsBeans.length === 0;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundDefault,
        },
      ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.backgroundDefault}
      />

      <Animated.View
        style={[
          styles.flatlistContainer,
          {paddingTop: insets.top + 20, opacity: fadeAnim},
        ]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
          contentContainerStyle={{
            paddingBottom: tabBarHeight,
          }}>
          <View style={styles.headerContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: colors.screenTitle,
                },
              ]}>
              {t('product.findBestCoffeeForYou')}
            </Text>
            <ProfileIconButton profileImage={user?.photoURL} />
          </View>
          <View style={styles.filterInputContainer}>
            <InputLocal
              placeholder={t('product.findYourCoffee')}
              textColor={colors.textLight}
              value={searchQuery}
              onChange={setSearchQuery}
              customStyle={[
                styles.filterInput,
                {
                  backgroundColor: colors.backgroundSearchInput,
                },
              ]}
            />
            <IconButton
              iconName="search"
              iconSize={16}
              iconColor={colors.gray500}
              activeOpacity={1}
              style={styles.filterIcon}
            />
          </View>
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
          {hasRegularProducts && (
            <CoffeeList ref={listRef} data={filteredItems} loading={loading} />
          )}

          {isSearchActive && !hasRegularProducts && <SearchNotFound />}

          <CoffeeBeans
            coffeeBeans={filteredItemsBeans}
            loading={loading}
            hasRegularProducts={hasRegularProducts}
          />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default CoffeeScreen;
