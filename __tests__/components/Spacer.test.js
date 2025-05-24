import React from 'react';
import {render} from '@testing-library/react-native';
import {Spacer} from '../../src/components';

describe('Spacer component', () => {
  const height = 20;
  const width = 10;

  const renderSpacer = props => render(<Spacer {...props} />);

  it('renders correctly with given height and width', () => {
    const {getByTestId} = renderSpacer({height: 20, width: 10});
    const spacer = getByTestId('spacer-view');
    
    expect(spacer).toBeTruthy();
    expect(spacer.props.style).toMatchObject({height, width});
  });

  it('renders correctly with only height', () => {
    const {getByTestId} = renderSpacer({height: 20});
    const spacer = getByTestId('spacer-view');

    expect(spacer.props.style).toMatchObject({height});
    expect(spacer.props.style.width).toBeUndefined(); // ensures width is not set
  });

  it('renders correctly with only width', () => {
    const {getByTestId} = renderSpacer({width: 10});
    const spacer = getByTestId('spacer-view');

    expect(spacer.props.style).toMatchObject({width});
    expect(spacer.props.style.height).toBeUndefined(); // ensures height is not set
  });

   it('renders correctly with no props', () => {
    const { getByTestId } = renderSpacer({});
    const spacer = getByTestId('spacer-view');

    expect(spacer).toBeTruthy();
    expect(spacer.props.style).toMatchObject({});
  });
});
