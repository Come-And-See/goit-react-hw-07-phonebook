import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export const counterSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    add: (state, action) => {
      state.contacts.push(action.payload);
    },
    remove: (state, action) => {
      state.contacts = state.contacts.filter(
        item => item.id !== action.payload
      );
    },
    filters: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { add, remove, filters } = counterSlice.actions;

export default counterSlice.reducer;
