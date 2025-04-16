export interface IntroSkipButtonProps {
  navigation: any;
}

export interface PageItem {
  id: number;
  image: any;
  title: string;
  description: string;
}

export interface IntroControlsProps {
  currentPage: number;
  scrollX: any;
  width: number;
  goToPreviousPage: (page: number) => void;
  goToNextPage: (page: number) => void;
  pagesLength: number;
  navigation: any;
}

export interface LoginUserInput {
  enteredEmail: string;
  enteredPassword: string;
}
export interface RegUserInput {
  enteredName: string;
  enteredEmail: string;
  enteredPassword: string;
  enteredConfirmPassword: string;
}

export interface UserInputErrors {
  [key: string]: string;
}

export interface LoginValidationResult {
  emailError: string;
  passwordError: string;
}
export interface RegValidationResult {
  nameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
}

export interface CoffeeItem {
  id: string;
  name: string;
  imageURL: string;
  subtitle: string;
  rating: number;
  ratingCount: string;
  tags: string[];
  description: string;
  sizes: string[];
  price: number;
}

export type RootStackParamList = {
  MainTabs: undefined;
  CoffeeDetailScreen: {item: CoffeeItem; readonly?: boolean};
  FavoritesScreen: undefined;
};
