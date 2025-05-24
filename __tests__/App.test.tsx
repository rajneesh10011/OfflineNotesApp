jest.mock('react-native-sqlite-storage');

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';

test('renders App without crashing', async () => {
  const { getByTestId } = render(<App />);
  
  await waitFor(() => {
    expect(getByTestId('app-main')).toBeTruthy();
  });
});
