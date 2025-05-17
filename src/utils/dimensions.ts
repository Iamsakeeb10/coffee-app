import {Dimensions} from 'react-native';

const screen = Dimensions.get('screen');
const window = Dimensions.get('window');

export const screenHeight = screen.height;
export const screenWidth = screen.width;

export const windowHeight = window.height;
export const windowWidth = window.width;

export const heightPercent = (percent: number) =>
  screen.height * (percent / 100);
export const widthPercent = (percent: number) => screen.width * (percent / 100);
