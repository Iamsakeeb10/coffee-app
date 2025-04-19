import {Animated, Easing} from 'react-native';

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

export const triggerScaleAnimation = (scaleValue: Animated.Value) => {
  Animated.sequence([
    Animated.timing(scaleValue, {
      toValue: 1.1,
      duration: 100,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }),
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }),
  ]).start();
};
