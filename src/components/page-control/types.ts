import {StyleProp, ViewStyle} from 'react-native';

export interface IAnimatedPageControlProps {
  count: number;
  activeIndex: number;
  dotSize?: number;
  dotSpacing?: number;
  containerStyle?: StyleProp<ViewStyle>;
  shouldDisplayIndicator?: boolean;
}
