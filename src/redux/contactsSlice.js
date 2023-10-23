import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  fetchContacts,
  deleteContact,
  editContact,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.rejected]: handleRejected,
    [editContact.pending]: handlePending,
    [editContact.rejected]: handleRejected,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = false;
      state.items = action.payload;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = false;
      state.items.push(action.payload);
    },

    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = false;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    },

    [editContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = false;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items[index].name = action.payload.updatedContact.name;
      state.items[index].phone = action.payload.updatedContact.phone;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
