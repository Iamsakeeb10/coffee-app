import {FC} from 'react';
import {Dimensions, StyleSheet, TextInput, TextInputProps} from 'react-native';
import {fontFamily} from '../../utils/typography';

const {width, height} = Dimensions.get('window');

interface InputLocalProps {
  customStyle?: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  onChange?: (text: string) => void;
  value?: string;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  returnKeyType?: TextInputProps['returnKeyType'];
  textColor?: string;
  error?: string;
}

const InputLocal: FC<InputLocalProps> = ({
  customStyle,
  placeholder,
  secureTextEntry = false,
  keyboardType,
  onChange,
  value,
  editable,
  selectTextOnFocus,
  returnKeyType,
  textColor = 'rgba(255,255,255,0.2)',
  error,
}) => {
  const errorSpace = error ? 5 : 15;

  return (
    <TextInput
      style={[styles.input, customStyle, {marginBottom: errorSpace}]}
      placeholderTextColor={textColor}
      placeholder={placeholder}
      returnKeyType={returnKeyType || 'next'}
      keyboardType={keyboardType}
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      autoCapitalize={'none'}
      underlineColorAndroid="rgba(0,0,0,0)"
      //   onChangeText={text => onChange(text)}
      value={value}
      editable={editable}
      selectTextOnFocus={selectTextOnFocus}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: width / 1.2,
    borderRadius: 3,
    backgroundColor: 'rgba(211,211,211,0.2)',
    color: '#fff',
    paddingHorizontal: 10,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  invalid: {
    backgroundColor: 'fc6063',
  },
});

export default InputLocal;
