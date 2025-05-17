import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '../../hooks/useTheme';
import {useTranslation} from '../../i18n/useTranslations';
import {setLanguage} from '../../redux/slices/languageSlice';
import {AppDispatch, RootState} from '../../redux/store/store';
import styles from '../../styles/LanguageBottomSheet.styles';
import {
  Language,
  LanguageBottomSheetProps,
} from '../../types/Profile/LanguageBottomSheet.type';
import BottomSheet from '../Common/BottomSheet';

const LanguageBottomSheet: React.FC<LanguageBottomSheetProps> = ({
  visible,
  onClose,
}) => {
  const {t} = useTranslation();

  const languages: Language[] = [
    {id: 'en', name: t('profile.language.english'), flag: '🇺🇸'},
    {id: 'bn', name: t('profile.language.bangla'), flag: '🇧🇩'},
  ];

  const {colors} = useTheme();

  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.current,
  );

  const [selectedLanguage, setSelectedLanguage] =
    React.useState(currentLanguage);

  React.useEffect(() => {
    if (visible) {
      setSelectedLanguage(currentLanguage);
    }
  }, [visible, currentLanguage]);

  const handleApply = () => {
    if (selectedLanguage !== currentLanguage) {
      dispatch(setLanguage(selectedLanguage));
    }
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} heightRatio={0.43}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Icon
              name="globe"
              size={20}
              color={colors.accentBadge}
              style={styles.titleIcon}
            />
            <Text style={styles.titleText}>
              {t('profile.language.select.label')}
            </Text>
          </View>
        </View>

        {/* List */}
        <FlatList
          keyExtractor={item => item.id}
          data={languages}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => {
            const isSelected = selectedLanguage === item.id;
            return (
              <Pressable
                onPress={() => setSelectedLanguage(item.id)}
                style={({pressed}) => [
                  styles.languageItem,
                  pressed && {backgroundColor: colors.gray100},
                ]}>
                <View style={styles.languageInfo}>
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text
                    style={[
                      styles.languageName,
                      isSelected && styles.selectedText,
                    ]}>
                    {item.name}
                  </Text>
                </View>

                {isSelected && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.selectedCheck}>✓</Text>
                  </View>
                )}
              </Pressable>
            );
          }}
        />

        <View style={styles.applyButtonContainer}>
          <Pressable
            onPress={handleApply}
            style={({pressed}) => [
              styles.applyButton,
              pressed && {backgroundColor: colors.gray100},
            ]}>
            <Text style={styles.applyButtonText}>
              {t('profile.language.apply.button')}
            </Text>
            <Icon
              name="chevron-right"
              size={18}
              color={colors.white}
              style={styles.applyButtonIcon}
            />
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
};

export default LanguageBottomSheet;
