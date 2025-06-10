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

export const TAX_RATE = 0.1;

export function calculateOrderTotals(subtotal: number) {
  const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));
  return {tax, total};
}

export const getTruncatedThana = (value: string) => {
  const firstWord = value.split(' ')[0]; // get the first word
  return value.trim().includes(' ') ? `${firstWord}` : firstWord;
};
