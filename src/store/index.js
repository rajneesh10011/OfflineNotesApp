import {configureStore} from '@reduxjs/toolkit';
import { notesSlice } from '../slices/notesSlice';

export const store = configureStore({
  reducer: {
    notesSlice: notesSlice.reducer,
  },
});

export const getStore = () => store;
