import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  page: 0,
  total: 0,
};

export const notesSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setNotes: (state, action) => {

    },
    addNote: (state, action) => {
      
    },
    removeNote: (state, action) => {
      
    },
    updateNote: (state, action) => {
     
    },

  },
});
export const {addNote, removeNote, updateNote} = notesSlice.actions;
