import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';

const HeaderBack = () => {
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const hasNotch = Platform.OS === 'ios' && insets.top > 20;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: hasNotch ? insets.top : 10,
        },
      ]}>
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="chevron-back" size={30} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
