import {createSlice} from '@reduxjs/toolkit';
import {
  fetchNotes,
  deleteNote,
  updateNote,
  insertNote,
} from '../storage/notesStorage';
import {Alert} from 'react-native';

const initialState = {
  notes: [],
  page: 0,
  total: 0,
};

export const notesSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    onSetNotes: (state, action) => {
      state.notes = state.notes.concat(action.payload.notes);
      state.page = action.payload.page;
      state.total = [...state.notes, action.payload.notes]?.length;
    },

    onAddNote: (state, action) => {
      state.notes = [action.payload, ...state.notes];
      state.total += 1;
    },

    onRemoveNote: (state, action) => {
      const id = action.payload.id || action.payload;
      state.notes = state.notes.filter(note => note.id !== id);
      state.total -= 1;
    },

    onUpdateNote: (state, action) => {
      const {id, title, body} = action.payload;
      const index = state.notes.findIndex(note => note.id === id);
      if (index !== -1) {
        state.notes[index] = {
          ...state.notes[index],
          ...(title !== undefined && {title}),
          ...(body !== undefined && {body}),
        };
      }
    },
    clearNotes: state => {
      state.notes = [];
      state.page = 0;
      state.total = 0;
    },
  },
});
export const {onSetNotes, onAddNote, onRemoveNote, onUpdateNote, clearNotes} =
  notesSlice.actions;

export const getNotes = request => async (dispatch, getState) => {
  const {limit = 10, page, onRequest, onSuccess, onFail} = request;

  const state = getState();
  const prevPage = state.notesSlice.page;
  try {
    onRequest?.();
    const currentPage = page || prevPage || 0;
    const res = await fetchNotes({
      limit,
      offset: currentPage * limit,
    });

    if (res) {
      dispatch(onSetNotes({notes: res, page: currentPage + 1}));
      onSuccess?.();
    } else {
      Alert.alert('Error', 'Failed to fetch notes');
      onFail?.('Failed to fetch notes');
    }
  } catch (error) {
    const code = error?.code || 'Unknown code';
    const message = error?.message || 'Something went wrong';
    Alert.alert(`Error (code: ${code})`, message);
    onFail?.(error?.message || 'Something went wrong');
    console.log(error?.message || 'Something went wrong');
  }
};

export const createNote = request => async (dispatch, getState) => {
  const {title, body, onRequest, onSuccess, onFail} = request;

  onRequest?.();
  try {
    const res = await insertNote({title, body});
    if (res) {
      dispatch(onAddNote(res));
      onSuccess?.();
    } else {
      Alert.alert('Error', 'Failed to add note');
      onFail?.('Failed to add note');
    }
  } catch (error) {
    const code = error?.code || 'Unknown code';
    const message = error?.message || 'Something went wrong';
    Alert.alert(`Error (code: ${code})`, message);
    onFail?.(error?.message || 'Something went wrong');
    console.log(error?.message || 'Something went wrong');
  }
};

export const deleteNoteData = request => async (dispatch, getState) => {
  const {id, onRequest, onSuccess, onFail} = request;

  onRequest?.();
  try {
    const res = await deleteNote({id});

    if (res) {
      dispatch(onRemoveNote(id));
      onSuccess?.();
    } else {
      Alert.alert('Error', 'Failed to delete note');
      onFail?.('Failed to delete note');
    }
  } catch (error) {
    const code = error?.code || 'Unknown code';
    const message = error?.message || 'Something went wrong';
    Alert.alert(`Error (code: ${code})`, message);
    onFail?.(error?.message || 'Something went wrong');
    console.log(error?.message || 'Something went wrong');
  }
};

export const editNote = request => async (dispatch, getState) => {
  const {id, title, body, onRequest, onSuccess, onFail} = request;

  onRequest?.();
  try {
    const res = await updateNote({id, title, body});
    if (res) {
      dispatch(onUpdateNote({id, title, body}));
      console.log(id, title, body);
      onSuccess?.();
    } else {
      Alert.alert('Error', 'Failed to update note');
      onFail?.('Failed to update note');
    }
  } catch (error) {
    const code = error?.code || 'Unknown code';
    const message = error?.message || 'Something went wrong';
    Alert.alert(`Error (code: ${code})`, message);
    onFail?.(error?.message || 'Something went wrong');
    console.log(error?.message || 'Something went wrong');
  }
};
