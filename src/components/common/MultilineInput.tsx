import React, {useState} from 'react';
import {
  Dimensions,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputContentSizeChangeEventData,
  TextInputProps,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../../constants/colors';
import {RootState} from '../../redux/store/store';
import {fontFamily} from '../../utils/typography';

type MultilineInputProps = {
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
  multiline?: boolean;
  numberOfLines?: number;
};

const {width} = Dimensions.get('window');

const MultilineInput: React.FC<MultilineInputProps> = ({
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
  multiline = false,
  numberOfLines = 1,
}) => {
  const {current} = useSelector((state: RootState) => state.language);
  const [inputHeight, setInputHeight] = useState(current === 'bn' ? 42 : 40);

  const errorSpace = error ? 5 : 15;

  const handleContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => {
    if (multiline) {
      setInputHeight(e.nativeEvent.contentSize.height);
    }
  };

  return (
    <TextInput
      style={[
        styles.input,
        customStyle,
        {
          marginBottom: errorSpace,
          height: multiline ? inputHeight : current === 'bn' ? 42 : 40,
          textAlignVertical: multiline ? 'top' : 'center',
        },
      ]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={textColor}
      keyboardType={keyboardType}
      autoCorrect={false}
      onChangeText={text => onChange(text)}
      autoCapitalize="none"
      underlineColorAndroid="transparent"
      value={value}
      editable={editable}
      selectTextOnFocus={selectTextOnFocus}
      returnKeyType={returnKeyType}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onContentSizeChange={handleContentSizeChange}
    />
  );
};

export default MultilineInput;

const styles = StyleSheet.create({
  input: {
    width: width / 1.2,
    borderRadius: 3,
    backgroundColor: 'rgba(211,211,211,0.2)',
    color: colors.white,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
});
