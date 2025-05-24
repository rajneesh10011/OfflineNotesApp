/**
 * Spacer Component
 *
 * A simple component to add vertical or horizontal spacing between elements.
 *
 * Props:
 * @param {number} [height] - The height of the spacer (vertical space).
 * @param {number} [width] - The width of the spacer (horizontal space).
 *
 * Usage:
 * <Spacer height={10} />  // Adds vertical space of 10 units
 * <Spacer width={20} />   // Adds horizontal space of 20 units
 */

import { View } from 'react-native';
import React from 'react';

const Spacer = ({ height, width }) => {
  return <View testID='spacer-view' style={{ height, width }} />;
};

export default React.memo(Spacer);
