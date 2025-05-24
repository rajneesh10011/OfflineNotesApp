import React from 'react';
import {render} from '@testing-library/react-native';
import {ScreenContainer} from '../../src/components';
import { Text } from 'react-native';

describe('ScreenContainer component', () => {
  const renderScreenContainer = props => render(<ScreenContainer {...props} />);

  it('renders correctly with children', () => {
    const {getByText} = renderScreenContainer({
      children: <Text>Test Child</Text>,
    });
    const childElement = getByText('Test Child');

    expect(childElement).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = {padding: 16};
    const {getByTestId} = renderScreenContainer({
      style: customStyle,
      children: <Text>Test Child</Text>,
    });
    const container = getByTestId('screen-container');

    expect(container.props.style).toContainEqual(customStyle);
  });
});
