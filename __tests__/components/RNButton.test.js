import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {RNButton} from '../../src/components';
import {Image, Text} from 'react-native';

describe('RNButton component', () => {
  const mockOnPress = jest.fn();
  const text = 'Submit';
  const icon = <Text>Icon</Text>; // Mock icon as a simple Text component

  const renderButton = props =>
    render(
      <RNButton text={text} onPress={mockOnPress} icon={icon} {...props} />,
    );

  it('renders correctly with default props', () => {
    const {getByText} = renderButton();
    expect(getByText(text)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn(); // ✅ define mock here (fresh for each test)
    const {getByTestId} = renderButton({loading: false, onPress: mockOnPress});
    const button = getByTestId('rn-button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when loading prop is true', () => {
    const {getByTestId} = renderButton({loading: true});
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('does not call onPress when loading', () => {
    const {getByTestId} = renderButton({loading: true, onPress: mockOnPress});
    const button = getByTestId('rn-button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('renders Image icon when provided', () => {
    const icon = (
      <Image
        source={{uri: 'https://example.com/icon.png'}}
        testID="button-icon"
      />
    );
    const {getByTestId} = renderButton({icon});
    expect(getByTestId('button-icon')).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = {backgroundColor: 'red'};
    const {getByTestId} = renderButton({style: customStyle});
    expect(getByTestId('rn-button').props.style.backgroundColor).toBe('red');
  });

  it('applies custom text styles correctly', () => {
    const customTextStyle = {color: 'white'};
    const {getByTestId} = renderButton({
      textStyle: customTextStyle,
      loading: false,
    });
    const textComponent = getByTestId('rnbutton-text');
    const appliedStyles = Array.isArray(textComponent.props.style)
      ? Object.assign({}, ...textComponent.props.style)
      : textComponent.props.style;
    expect(appliedStyles.color).toBe('white');
  });
});
