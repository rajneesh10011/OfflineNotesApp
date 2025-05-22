/**
 * MyStatusBar Component
 *
 * A custom status bar component that sets a background color and handles safe area insets.
 * Wraps the native StatusBar and SafeAreaView to provide consistent styling and behavior.
 *
 * Props:
 * @param {string} backgroundColor - The background color for the status bar area.
 * @param {object} props - Additional props passed to the native StatusBar component.
 *
 * Usage:
 * <MyStatusBar
 *   backgroundColor="#6200EE"
 *   barStyle="light-content"
 *   translucent={true}
 * />
 */

import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MyStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
};

export default React.memo(MyStatusBar);

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
