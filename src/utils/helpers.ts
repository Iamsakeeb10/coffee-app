export const getFullSize = (selectedSizeLabel: string): string => {
  switch (selectedSizeLabel) {
    case 'S':
      return 'Small';
    case 'M':
      return 'Medium';
    case 'L':
      return 'Large';
    default:
      return selectedSizeLabel;
  }
};
