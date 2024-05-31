import {ReactElement} from 'react';
import {StyleSheet} from 'react-native';

export const OVERDRAG = 24;
export const DEFAULT_VIEW_HEIGHT = 300;

export interface ISheetConfig {
  height?: number;
  overDrag?: number;
}

export const SHEET_CONFIG: ISheetConfig = {
  height: DEFAULT_VIEW_HEIGHT,
  overDrag: OVERDRAG,
};

export interface BottomSheetRef {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export interface ISimpleBottomSheetProps {
  children: ReactElement;
  config?: ISheetConfig;
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
    height: 8,
    width: 42,

    borderRadius: 12,

    backgroundColor: '#ccc',

    marginVertical: 8,
    alignSelf: 'center',
  },
});
