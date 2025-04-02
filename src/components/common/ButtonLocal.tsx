import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontFamily} from '../../utils/typography';

const {width, height} = Dimensions.get('window');

const ButtonLocal = ({
  buttonStyle,
  disabled,
  textStyle,
  title,
  onPressHandler,
  iconName,
  loading,
}: any) => {
  const content = (
    <View
      style={[
        styles.container,
        buttonStyle,
        disabled ? styles.disabled : null,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          {iconName && (
            <Ionicons
              style={{paddingTop: 5}}
              name={iconName}
              size={18}
              color="#fff"
            />
          )}
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </>
      )}
    </View>
  );

  if (disabled) {
    return content;
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPressHandler}>
      {content}
    </TouchableOpacity>
  );
};

export default ButtonLocal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#68c15e',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    width: width / 1.2,
  },
  buttonText: {
    color: '#fff',
    fontFamily: fontFamily.medium,
    fontSize: 15,
    padding: 10,
  },
  disabled: {
    opacity: 0.5,
  },
});
