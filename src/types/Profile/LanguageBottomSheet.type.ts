// src/i18n/types.ts
export type LanguageCode = 'en' | 'bn';

export interface Language {
  id: string;
  name: string;
  flag: string;
}

export interface LanguageState {
  current: string;
}

export interface LanguageBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}
