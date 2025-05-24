/**
 * RNButton Component
 *
 * A customizable button component with optional icon support and loading state.
 * When loading is true, shows a spinner and disables the button.
 *
 * Props:
 * @param {string} text - The button text to display.
 * @param {object} [style] - Optional custom style for the button container.
 * @param {object} [textStyle] - Optional custom style for the button text.
 * @param {function} onPress - Callback fired when the button is pressed.
 * @param {React.ReactNode} [icon] - Optional React element (usually an Image or Icon) displayed before the text.
 * @param {boolean} [loading] - When true, show a loading spinner and disable button.
 *
 * Usage:
 * <RNButton
 *   text="Submit"
 *   onPress={handleSubmit}
 *   loading={isSubmitting}
 *   icon={<Image source={icons.submitIcon} style={{ width: 20, height: 20 }} />}
 *   style={{ backgroundColor: 'blue' }}
 *   textStyle={{ color: 'white' }}
 * />
 */

import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import colors from '../constant/colors';
import Spacer from './Spacer';

const RNButton = ({ text, style, textStyle, onPress, icon, loading = false }) => {
  return (
    <TouchableOpacity
      testID='rn-button'
      style={[styles.button, style, loading && styles.disabledButton]}
      onPress={!loading ? onPress : undefined}
      disabled={loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator testID='activity-indicator' size="small" color={colors.primaryText} />
      ) : (
        <>
          {icon && icon}
          {icon && <Spacer width={5} />}
          <Text testID='rnbutton-text' style={[styles.buttonText, textStyle]}>{text}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(RNButton);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.primaryText,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
