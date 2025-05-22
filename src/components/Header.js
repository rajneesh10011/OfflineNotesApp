/**
 * Header Component
 *
 * A reusable header component for screens. Includes a back icon on the left (optional),
 * a title in the center, and optional content on the right (like icons or actions).
 *
 * Props:
 * @param {string} title - The title to display in the center of the header.
 * @param {boolean} [leftIcon=true] - Whether to show the back icon on the left.
 * @param {function} [rightContent] - A function that returns a React node to be displayed on the right side.
 * @param {function} [onPressBack] - A callback function triggered when the back icon is pressed.
 *
 * Usage:
 * <Header
 *   title="Dashboard"
 *   leftIcon={true}
 *   rightContent={() => (
 *     <TouchableOpacity onPress={handleSettings}>
 *       <Image source={icons.settings} style={{ width: 24, height: 24 }} />
 *     </TouchableOpacity>
 *   )}
 *   onPressBack={() => navigation.goBack()}
 * />
 */

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../constant/colors';
import { icons } from '../assets';
import Spacer from './Spacer';

const Header = ({ title, leftIcon = true, rightContent, onPressBack }) => {
  return (
    <View style={styles.container}>
      {leftIcon ? (
        <TouchableOpacity
          onPress={onPressBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Image source={icons.backIcon} style={styles.backIcon} />
        </TouchableOpacity>
      ) : (
        <Spacer width={24} />
      )}
      <Text style={styles.title}>{title}</Text>
      {rightContent ? rightContent() : <Spacer width={24} />}
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.22,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    color: colors.primaryText,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});
