import React, {useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, StatusBar, View} from 'react-native';
import IntroControls from '../components/IntroControls';
import IntroIndicator from '../components/IntroIndicator';
import IntroItem from '../components/IntroItem';
import IntroSkipButton from '../components/IntroSkipButton';
import {pages} from '../constants/onboardingData';
import {styles} from '../styles/introScreenStyles';
import {alertHandler} from '../utils/alertHandler';

const {width} = Dimensions.get('screen');

const IntroScreen = ({navigation}: any) => {
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
        renderItem={({item}) => <IntroItem item={item} />}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={e =>
          setCurrentPage(Math.floor(e.nativeEvent.contentOffset.x / width))
        }
      />
      <IntroIndicator
        animatedCurrent={animatedCurrent}
        pagesLength={pages.length}
      />
      <IntroSkipButton alertHandler={alertHandler} />
      <IntroControls
        currentPage={currentPage}
        scrollX={scrollX}
        width={width}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        alertHandler={alertHandler}
        pagesLength={pages.length}
      />
    </View>
  );
};

export default IntroScreen;
