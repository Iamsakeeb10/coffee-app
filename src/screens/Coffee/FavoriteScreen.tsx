import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants/colors';

const FavoriteScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#fff',
        }}>
        FavoriteScreen
      </Text>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
