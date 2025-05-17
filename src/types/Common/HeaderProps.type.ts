export interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  showBack?: boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftIconName?: string;
  rightIconName?: string;
  onRightPress?: () => void;
  headerStyle?: object;
  titleStyle?: object;
  backgroundColor?: string;
  color?: string;
  useSafeArea?: boolean;
}
