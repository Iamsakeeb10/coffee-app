import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/store';
import {LanguageCode} from '../types/Profile/LanguageBottomSheet.type';
import {translations} from './locales';

export const useTranslation = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.current,
  ) as LanguageCode;

  const t = (key: string, fallback?: string): string => {
    const translation = translations[currentLanguage]?.[key];
    if (!translation) {
      return translations['en'][key] || fallback || key;
    }
    return translation;
  };

  return {t, currentLanguage};
};
