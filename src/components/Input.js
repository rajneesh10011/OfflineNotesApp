/**
 * Input Component
 *
 * A customizable input field with label, error message, and support for various TextInput props.
 *
 * Props:
 * @param {string} label - The label displayed above the input field.
 * @param {string} placeholder - The placeholder text inside the input.
 * @param {string} value - The current value of the input field.
 * @param {function} onChangeText - Callback when the text in the input changes.
 * @param {string} [error] - Optional error message to display below the input.
 * @param {object} [inputStyle] - Optional style override for the TextInput.
 * @param {object} [props] - Additional props passed to the underlying TextInput.
 *
 * Usage:
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 *   error={emailError}
 * />
 */

import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import colors from '../constant/colors';
import Spacer from './Spacer';

const Input = ({
  label,
  inputStyle,
  placeholder,
  value,
  onChangeText,
  error,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Spacer height={7} />
      <TextInput
        style={[styles.input, inputStyle, error && { borderColor: colors.error }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.secondaryText}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default React.memo(Input);

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.black + 30,
    borderRadius: 8,
    padding: 16,
  },
  error: {
    fontSize: 12,
    color: colors.error,
    marginTop: 3,
  },
});
