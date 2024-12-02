import {ReactElement} from 'react';
import {StyleSheet, Dimensions, ViewStyle} from 'react-native';

const {height: deviceHeight} = Dimensions.get('window');

export const OVERDRAG = 24;
export const DEFAULT_VIEW_MIN_HEIGHT = deviceHeight * 0.1;
export const DEFAULT_VIEW_MAX_HEIGHT = deviceHeight * 0.6;

export interface ISheetConfig {
  maxHeight?: number;
  minHeight?: number;
  overDrag?: number;
}

export const SHEET_CONFIG: ISheetConfig = {
  overDrag: OVERDRAG,
  minHeight: DEFAULT_VIEW_MIN_HEIGHT,
  maxHeight: DEFAULT_VIEW_MAX_HEIGHT,
};

export interface BottomSheetRef {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export interface ISimpleBottomSheetProps {
  children: ReactElement;
  config?: ISheetConfig;
  customStyle?: ViewStyle;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backDrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  bottomSheet: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
    minHeight: 100,
  },

  indicator: {
    height: 4,
    width: 54,

    borderRadius: 12,

    backgroundColor: '#ECECF2',

    marginVertical: 8,
    alignSelf: 'center',
  },
});
