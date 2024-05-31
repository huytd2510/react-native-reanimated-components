import * as React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AnimatedPageControl, AnimatedBottomSheet} from 'react-native-reanimated-components';
import {BottomSheetRef} from '../../src/components/bottom-sheet/types';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  const sheetRef = React.createRef<BottomSheetRef>();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            sheetRef.current?.show();
          }}
          style={{marginBottom: 36, borderWidth: 0.5, borderRadius: 36, padding: 12,}}>
          <Text>Show sheet</Text>
        </TouchableOpacity>

        <AnimatedPageControl count={5} activeIndex={1} dotSize={10} dotSpacing={10} />

        <AnimatedBottomSheet ref={sheetRef}>
          <View style={{height: 300, backgroundColor: 'green'}} />
        </AnimatedBottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
