import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {IAnimatedPageControlProps} from './types';

const AnimatedPageControl = ({
  count,
  activeIndex,
  dotSize = 8,
  dotSpacing = 6,
  containerStyle,
  shouldDisplayIndicator = true,
}: IAnimatedPageControlProps) => {
  const dotPositions = Array.from({length: count}, (_, i) => i);

  const animatedActiveDot = useSharedValue(activeIndex);

  useEffect(() => {
    if (animatedActiveDot.value !== activeIndex) {
      animatedActiveDot.value = activeIndex;
    }
  }, [activeIndex, animatedActiveDot]);

  const dotIndicatorStyle = useAnimatedStyle(() => {
    const translateX = withTiming(animatedActiveDot.value * (dotSize + dotSpacing));
    return {
      transform: [{translateX}],
    };
  });

  if (!shouldDisplayIndicator) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {dotPositions.map((position) => (
        <View key={`dot-position-${position + 1}`} style={styles.dot} />
      ))}

      <Animated.View
        style={[styles.activeDot, {width: dotSize, height: dotSize}, dotIndicatorStyle]}
      />
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
