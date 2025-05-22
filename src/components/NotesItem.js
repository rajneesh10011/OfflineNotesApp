/**
 * NotesItem Component
 *
 * Displays a single note item with an ID, title, description,
 * and actions to delete or edit the note.
 *
 * Props:
 * @param {string|number} id - Unique identifier of the note.
 * @param {string} title - The title of the note.
 * @param {string} description - The note's description or content.
 * @param {function} onPressDelete - Callback function when delete icon is pressed.
 * @param {function} onPressEdit - Callback function when the edit button is pressed.
 *
 * Usage:
 * <NotesItem
 *   id={1}
 *   title="Meeting notes"
 *   description="Discuss quarterly goals and milestones."
 *   onPressDelete={() => handleDelete(1)}
 *   onPressEdit={() => handleEdit(1)}
 * />
 */

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../constant/colors';
import { icons } from '../assets';
import RNButton from './RNButton';
import Spacer from './Spacer';

const NotesItem = ({ id, title, description, onPressDelete, onPressEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View>
          <Text style={styles.id} numberOfLines={1}>
            {`#${id}`}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={onPressDelete}>
            <Image
              tintColor={colors.error}
              resizeMode="contain"
              source={icons.deleteIcon}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Spacer height={4} />
      <Text style={styles.description}>{description}</Text>
      <Spacer height={16} />
      <RNButton
        onPress={onPressEdit}
        text="Edit"
        style={styles.editButton}
        icon={
          <Image
            resizeMode="contain"
            source={icons.editIcon}
            style={styles.deleteIcon}
          />
        }
      />
    </View>
  );
};

export default React.memo(NotesItem);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 14,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.22,
    elevation: 3,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  id: {
    fontSize: 12,
    color: colors.secondaryText,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: colors.primaryText,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: colors.secondaryText,
    fontWeight: '500',
  },
  editButton: {
    padding: 0,
    paddingVertical: 10,
    marginHorizontal: 0,
    borderRadius: 10,
  },
  deleteIcon: {
    height: 20,
    width: 20,
  },
});
