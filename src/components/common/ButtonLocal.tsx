import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const ButtonLocal = (props: {
  buttonStyle?: any;
  disabled?: any;
  textStyle?: any;
  title?: any;
  onPressHandler?: any;
  iconName?: any;
  testId?: any;
}) => {
  const {
    buttonStyle,
    disabled,
    textStyle,
    title,
    onPressHandler,
    iconName,
    testId,
  } = props;

  const content = (
    <View
      style={[
        styles.container,
        buttonStyle,
        disabled ? styles.disabled : null,
      ]}>
      {iconName && (
        <Ionicons
          name={iconName}
          size={18}
          color="white"
          style={{paddingTop: 5}}
        />
      )}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </View>
  );

  if (disabled) {
    return content;
  }

  return (
    <TouchableOpacity
      testID={testId}
      onPress={onPressHandler}
      activeOpacity={0.7}>
      {content}
    </TouchableOpacity>
  );
};

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
    padding: 10,
    color: 'white',
    fontSize: 15,
    fontFamily: 'Ubuntu-Medium',
    textTransform: 'uppercase',
  },
  disabled: {
    // backgroundColor: "rgba(87, 184, 102, .7)",
    opacity: 0.5,
  },
});

export default ButtonLocal;
