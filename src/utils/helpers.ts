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

export const getIconName = (name: string, focused: any) => {
  let iconName = '';

  if (name === 'Coffee') {
    iconName = focused ? 'cafe' : 'cafe-outline';
  } else if (name === 'FavoritesScreen') {
    iconName = focused ? 'heart' : 'heart-outline';
  } else if (name === 'Cart') {
    iconName = focused ? 'cart' : 'cart-outline';
  }

  return iconName;
};
