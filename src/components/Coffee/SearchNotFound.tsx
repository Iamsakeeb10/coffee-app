import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {fontFamily} from '../../utils/typography';

const {width, height} = Dimensions.get('window');
const SearchNotFound = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/404-error.png')}
        resizeMode="contain"
        style={styles.imageStyle}
      />
      <Text style={styles.textStyle}>No Coffee Found</Text>
    </View>
  );
};

export default SearchNotFound;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.1,
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginBottom: 14,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 0.8,
    fontFamily: fontFamily.medium,
  },
});
