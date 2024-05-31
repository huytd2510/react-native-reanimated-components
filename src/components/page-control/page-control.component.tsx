import React, {useEffect} from 'react';
import {ViewStyle} from 'react-native';
import {StyleProp} from 'react-native';
import {StyleSheet, View} from 'react-native';

import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

export interface IAnimatedPageControlProps {
  count: number;
  activeIndex: number;
  dotSize?: number;
  dotSpacing?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const AnimatedPageControl = ({
  count,
  activeIndex,
  dotSize = 8,
  dotSpacing = 6,
  containerStyle,
}: IAnimatedPageControlProps) => {
  const dotPositions = Array.from({length: count}, (_, i) => i);

  const animatedActiveDot = useSharedValue(activeIndex);

  useEffect(() => {
    if (animatedActiveDot.value !== activeIndex && activeIndex < count) {
      animatedActiveDot.value = activeIndex;
    }
  }, [activeIndex, animatedActiveDot, count]);

  const dotIndicatorStyle = useAnimatedStyle(() => {
    const translateX = withTiming(animatedActiveDot.value * (dotSize + dotSpacing));
    return {
      transform: [{translateX}],
    };
  });

  const dotStyle = {width: dotSize, height: dotSize, borderRadius: dotSize};

  return (
    <View style={[styles.container, containerStyle]}>
      {dotPositions.map((position) => (
        <View
          key={`dot-position-${position + 1}`}
          style={[styles.dot, dotStyle, {marginRight: dotSpacing}]}
        />
      ))}

      <Animated.View style={[styles.activeDot, dotStyle, dotIndicatorStyle]} />
    </View>
  );
};

export default AnimatedPageControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: '#ccc', // Inactive dot color
    marginRight: 6,
  },
  activeDot: {
    borderRadius: 8 / 2,
    backgroundColor: '#3538CD', // Active dot color
    position: 'absolute',
  },
});
