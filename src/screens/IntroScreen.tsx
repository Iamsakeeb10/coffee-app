import React, {useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PageIndicator} from 'react-native-page-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';
import {fontFamily} from '../utils/typography';

const pages = [
  {
    id: 1,
    image: require('../assets/images/coffee-intro-1.jpg'),
    title: 'Taste Perfection',
    description: 'Your go-to source for premium coffee.',
  },
  {
    id: 2,
    image: require('../assets/images/coffee-intro-2.jpg'),
    title: 'Click. Sip. Enjoy.',
    description: 'Effortless coffee delivery, right to your door.',
  },
  {
    id: 3,
    image: require('../assets/images/coffee-intro-3.jpg'),
    title: 'Savor the Brew',
    description: 'Crafted by experts, savored by you.',
  },
];

const {width, height} = Dimensions.get('screen');

const IntroScreen = ({navigation}: any) => {
  const scrollX = useRef<any>(new Animated.Value(0)).current;
  const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;
  const [currentPage, setCurrentPage] = useState(0);

  const goToNextPage = (currentPage: number) => {
    const nextPage = currentPage + 1;
    if (nextPage < pages.length) {
      setCurrentPage(nextPage);
      flatListRef.current?.scrollToIndex({index: nextPage, animated: true});
    }
  };

  const goToPreviousPage = (currentPage: number) => {
    const prevPage = currentPage - 1;
    if (prevPage >= 0) {
      setCurrentPage(prevPage);
      flatListRef.current?.scrollToIndex({index: prevPage, animated: true});
    }
  };

  const alertHandler = () => {
    Alert.alert(
      'Not Ready Yet...',
      "We're still putting the finishing touches on this. Stay tuned!",
      [{text: 'Alright'}],
    );
  };

  const flatListRef = useRef<any>(null);

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
        renderItem={({item}) => (
          <View style={[styles.pageContainer, {width, height}]}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              fadeDuration={300}
              style={styles.imageBackground}>
              <View style={styles.contentWrapper}>
                <Text style={[styles.title]}>{item.title}</Text>
                <Text style={[styles.description, {maxWidth: width * 0.7}]}>
                  {item.description}
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={e => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / width);
          setCurrentPage(index);
        }}
      />

      <View style={styles.pageIndicator}>
        <PageIndicator
          count={pages.length}
          current={animatedCurrent}
          color={colors.white}
        />
      </View>
      <Pressable
        hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
        onPress={alertHandler}
        style={{
          position: 'absolute',
          top: height - height * 0.93,
          right: 20,
          backgroundColor: colors.gray,
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 12,
          paddingVertical: 6,
          flexDirection: 'row',
          elevation: 8,
        }}>
        <Text style={{color: colors.white}}>Skip</Text>
      </Pressable>

      <View
        style={[
          styles.buttonContainer,
          {
            justifyContent: currentPage === 0 ? 'flex-end' : 'space-between',
          },
        ]}>
        {(currentPage === 1 || currentPage === 2) && (
          <TouchableOpacity
            hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
            onPress={() => {
              const currentPage = Math.round(scrollX._value / width);
              goToPreviousPage(currentPage);
            }}>
            <Ionicons
              name="arrow-back-outline"
              size={26}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
        {currentPage === 2 ? (
          <Pressable
            onPress={alertHandler}
            hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}>
            <Text style={styles.getStartedText}>Get started</Text>
          </Pressable>
        ) : (
          <TouchableOpacity
            hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
            onPress={() => {
              const currentPage = Math.round(scrollX._value / width);
              goToNextPage(currentPage);
            }}>
            <Ionicons
              name="arrow-forward-outline"
              size={26}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  contentWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 32,
    letterSpacing: 0.5,
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    marginBottom: 12,
    textShadowColor: colors.blackShadow, // Add a shadow to the text
    textShadowOffset: {width: 1, height: 1}, // Shadow positioning
    textShadowRadius: 5, // Blur radius for shadow
  },
  description: {
    color: colors.lightGray,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    lineHeight: 20, // Adjust line height for better readability
    letterSpacing: 1, // Slightly increase space between letters
    textShadowColor: colors.lightBlackShadow, // Shadow effect for description
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 4,
  },
  pageIndicator: {
    position: 'absolute',
    bottom: height - height * 0.96,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height - height * 0.975,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  getStartedText: {
    color: colors.white,
    marginBottom: 3,
    fontSize: 15,
    fontFamily: fontFamily.medium,
  },
});

export default IntroScreen;
