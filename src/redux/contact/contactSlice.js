import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetContacts = createAsyncThunk(
  'contact/GetContacts',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get(
        'https://6480c2b3f061e6ec4d49d6bb.mockapi.io/contacts'
      );

      if (response.status !== 200) {
        throw new Error('Server Error');
      }

      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const PostContacts = createAsyncThunk(
  'contact/PostContacts',
  async function (contact, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.post(
        `https://6480c2b3f061e6ec4d49d6bb.mockapi.io/contacts`,
        {
          name: contact.name,
          phone: contact.phone,
        }
      );

      if (response.status !== 200) {
        throw new Error('Server Error');
      }

      const data = await response.data;
      dispatch(add(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const DeleteContacts = createAsyncThunk(
  'contact/DeleteContacts',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.delete(
        `https://6480c2b3f061e6ec4d49d6bb.mockapi.io/contacts/${id}`
      );

      if (response.status !== 200) {
        throw new Error('Server Error');
      }

      dispatch(remove(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const counterSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    add: (state, action) => {
      state.contacts.items.push(action.payload);
    },
    remove: (state, action) => {
      state.contacts.items = state.contacts.items.filter(
        item => item.id !== action.payload
      );
    },
    filters: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [GetContacts.pending]: state => {
      state.contacts.isLoading = true;
    },
    [GetContacts.fulfilled]: (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items = action.payload;
    },
    [GetContacts.rejected]: (state, action) => {
      state.contacts.error = action.payload;
    },
    [DeleteContacts.rejected]: (state, action) => {
      state.contacts.error = action.payload;
    },
    [PostContacts.rejected]: (state, action) => {
      state.contacts.error = action.payload;
    },
  },
});

export const { add, remove, filters } = counterSlice.actions;

export default counterSlice.reducer;
