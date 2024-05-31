import React, {ForwardRefRenderFunction, forwardRef, useImperativeHandle, useState} from 'react';
import {Pressable, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {BottomSheetRef, ISheetConfig, ISimpleBottomSheetProps, SHEET_CONFIG, styles} from './types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SimpleBottomSheet: ForwardRefRenderFunction<BottomSheetRef, ISimpleBottomSheetProps> = (
  props,
  ref
) => {
  const config: ISheetConfig = {...SHEET_CONFIG, ...props.config};
  const [isShowSheet, setIsShowSheet] = useState(false);

  const offset = useSharedValue(0);

  const show = () => {
    setIsShowSheet(true);
  };
  const hide = () => {
    setIsShowSheet(false);
  };
  const toggle = () => {
    setIsShowSheet(!isShowSheet);
    offset.value = withTiming(0, {duration: 300});
  };

  useImperativeHandle(
    ref,
    (): BottomSheetRef => ({
      show,
      hide,
      toggle,
    })
  );

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-config.overDrag!, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : clamp;
    })
    .onFinalize(() => {
      if (offset.value < config.height! / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(config.height!, {}, () => {
          runOnJS(toggle)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
  }));

  if (!isShowSheet) return null;

  return (
    <>
      <AnimatedPressable
        style={styles.backDrop}
        onPress={toggle}
        entering={FadeIn}
        exiting={FadeOut}
      />

      <GestureDetector gesture={pan}>
        <Animated.View
          style={[styles.bottomSheet, {height: config.height}, translateY]}
          entering={SlideInDown.springify().damping(16)}
          exiting={SlideOutDown}>
          <View style={styles.indicator} />
          {props.children}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default forwardRef(SimpleBottomSheet);
