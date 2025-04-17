import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../utils/typography';

const {width, height} = Dimensions.get('window');

const ButtonLocal = ({
  buttonStyle,
  disabled,
  textStyle,
  title,
  onPressHandler,
  loading,
  url,
  loaderColor = colors.white,
}: any) => {
  const content = (
    <View
      style={[
        styles.container,
        buttonStyle,
        disabled ? styles.disabled : null,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <>
          {url && (
            <Image
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
              source={url}
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
