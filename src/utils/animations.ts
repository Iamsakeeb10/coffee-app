import {Animated} from 'react-native';

export const animateCard = (
  opacity: Animated.Value,
  translateY: Animated.Value,
  scale: Animated.Value,
  index: number,
) => {
  const delay = index * 100;

  Animated.parallel([
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      delay,
      useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      delay,
      useNativeDriver: true,
    }),
    Animated.timing(scale, {
      toValue: 1,
      duration: 250,
      delay,
      useNativeDriver: true,
    }),
  ]).start();
};
