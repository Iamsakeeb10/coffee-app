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

export interface UserInput {
  enteredEmail: string;
  enteredPassword: string;
}

export interface UserInputErrors {
  [key: string]: string;
}

export interface ValidationResult {
  emailError: string;
  passwordError: string;
}
