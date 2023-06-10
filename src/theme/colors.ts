import { ColorValue } from 'react-native';

type ColorType = {
  [index: string]: ColorValue | undefined;
};

const colors: ColorType = {
  black: '#121212',
  white: '#dcdcdc',
  gold: '#daa520',
  grey: '#bababa',
};

export default colors;
