import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {colors} from '../../constants/colors';

const TypingLoader = ({size = 8, color = colors.white}) => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;
  const scale3 = useRef(new Animated.Value(1)).current;

  const position = useRef(new Animated.Value(0)).current;

  const wave = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createPulseAnimation = (
      opacityAnim: any,
      scaleAnim: any,
      delay: any,
    ) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacityAnim, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );
    };

    const waveAnimation = Animated.loop(
      Animated.timing(wave, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    );

    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: 5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    const anim1 = createPulseAnimation(dot1, scale1, 0);
    const anim2 = createPulseAnimation(dot2, scale2, 150);
    const anim3 = createPulseAnimation(dot3, scale3, 300);

    anim1.start();
    anim2.start();
    anim3.start();
    waveAnimation.start();
    floatAnimation.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
      waveAnimation.stop();
      floatAnimation.stop();
    };
  }, []);

  const shadowOpacity = wave.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.2, 0.5, 0.2],
  });

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[styles.dotsContainer, {transform: [{translateY: position}]}]}>
        <Animated.View
          style={[
            styles.dot,
            {
              opacity: dot1,
              transform: [{scale: scale1}],
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              shadowOpacity: shadowOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              opacity: dot2,
              transform: [{scale: scale2}],
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              shadowOpacity: shadowOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              opacity: dot3,
              transform: [{scale: scale3}],
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              shadowOpacity: shadowOpacity,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.background,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  dot: {
    marginHorizontal: 4,
    shadowColor: colors.white,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    elevation: 3,
  },
});

export default TypingLoader;
