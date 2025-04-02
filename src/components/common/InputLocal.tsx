import React from 'react';
import {Dimensions, StyleSheet, TextInput, TextInputProps} from 'react-native';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../utils/typography';

type InputLocalProps = {
  customStyle?: object;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  onChange: (text: string) => void;
  value?: string;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  returnKeyType?: TextInputProps['returnKeyType'];
  textColor?: string;
  error?: string;
};

const {width, height} = Dimensions.get('window');

const InputLocal: React.FC<InputLocalProps> = ({
  customStyle,
  placeholder,
  secureTextEntry = false,
  keyboardType,
  onChange,
  value,
  editable = true,
  selectTextOnFocus,
  returnKeyType,
  textColor = 'rgba(255,255,255,0.2)',
  error,
}) => {
  const errorSpace = error ? 5 : 15;

  return (
    <TextInput
      style={[styles.input, customStyle, {marginBottom: errorSpace}]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={textColor}
      keyboardType={keyboardType}
      autoCorrect={false}
      onChangeText={text => onChange(text)}
      autoCapitalize="none"
      underlineColorAndroid="rgba(0, 0, 0,0)"
      value={value}
      editable={editable}
      selectTextOnFocus={selectTextOnFocus}
      returnKeyType={returnKeyType}
    />
  );
};

export default InputLocal;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: width / 1.2,
    borderRadius: 3,
    backgroundColor: 'rgba(211,211,211,0.2)',
    color: colors.white,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
});
