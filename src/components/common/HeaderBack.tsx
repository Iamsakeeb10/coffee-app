import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
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
        <Icon name="arrow-back" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeaderBack;
