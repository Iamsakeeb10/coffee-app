import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  View,
} from 'react-native';
import IntroControls from '../../components/Intro/IntroControls';
import IntroIndicator from '../../components/Intro/IntroIndicator';
import IntroItem from '../../components/Intro/IntroItem';
import IntroSkipButton from '../../components/Intro/IntroSkipButton';
import {pages} from '../../constants/onboardingData';
import {styles} from '../../styles/introScreenStyles';
import {IntroSkipButtonProps, PageItem} from '../../types/types';

const {width} = Dimensions.get('screen');

const IntroScreen: React.FC<IntroSkipButtonProps> = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const animatedCurrent = useRef<Animated.AnimatedDivision<number>>(
    Animated.divide(scrollX, width),
  ).current;

  const goToNextPage = (page: number): void => {
    const nextPage = page + 1;
    if (nextPage < pages.length) {
      setCurrentPage(nextPage);
      flatListRef.current?.scrollToIndex({index: nextPage, animated: true});
    }
  };

  const goToPreviousPage = (page: number): void => {
    const prevPage = page - 1;
    if (prevPage >= 0) {
      setCurrentPage(prevPage);
      flatListRef.current?.scrollToIndex({index: prevPage, animated: true});
    }
  };

  const renderItem = useCallback(
    ({item}: {item: PageItem}) => <IntroItem item={item} />,
    [],
  );

  const handleScroll = useCallback(
    Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
      useNativeDriver: false,
    }),
    [scrollX],
  );

  const handleMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const newPage = Math.floor(e.nativeEvent.contentOffset.x / width);
      setCurrentPage(newPage);
    },
    [setCurrentPage],
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={pages}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
      <IntroIndicator
        animatedCurrent={animatedCurrent}
        pagesLength={pages.length}
      />
      <IntroSkipButton navigation={navigation} />
      <IntroControls
        currentPage={currentPage}
        scrollX={scrollX}
        width={width}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        pagesLength={pages.length}
        navigation={navigation}
      />
    </View>
  );
};

export default IntroScreen;
