import {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {fontFamily} from '../../utils/typography';

const {width} = Dimensions.get('window');

const AnimatedErrorText = ({errorText, color = '#fc6063'}: any) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-20)).current;
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (errorText) {
      shake.setValue(0);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(200),
          Animated.sequence([
            Animated.timing(shake, {
              toValue: 3,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shake, {
              toValue: -3,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shake, {
              toValue: 2,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shake, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [errorText, opacity, translateX, shake]);

  const translateXWithShake = Animated.add(translateX, shake);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.errorText,
          {color: color},
          {
            opacity,
            transform: [{translateX: translateXWithShake}],
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 1,
          },
        ]}>
        {errorText}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 1.2,
    marginBottom: 7,
  },
  errorText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
  },
});

export default AnimatedErrorText;
