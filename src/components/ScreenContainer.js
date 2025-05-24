/**
 * ScreenContainer Component
 *
 * A reusable container component for app screens that handles
 * status bar styling and safe area layout.
 *
 * Props:
 * @param {React.ReactNode} children - The content to render inside the container.
 * @param {object} [style] - Optional style overrides for the SafeAreaView container.
 *
 * Usage:
 * <ScreenContainer style={{ padding: 16 }}>
 *   <Text>Hello World</Text>
 * </ScreenContainer>
 */

import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../constant/colors';
import MyStatusBar from './MyStatusBar';

const ScreenContainer = ({children, style}) => {
  return (
    <>
      <MyStatusBar backgroundColor={colors.primary} barStyle="default" />
      <SafeAreaView testID="screen-container" style={[styles.container, style]}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default React.memo(ScreenContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
