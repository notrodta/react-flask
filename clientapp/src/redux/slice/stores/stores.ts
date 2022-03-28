import { createSlice } from '@reduxjs/toolkit';
import Store from '../../../models/Store';

interface StoresState {
  stores: Store[];
}

const initialState: StoresState = {
  stores: []
};

const stores = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    getStoresSlice: (state: any, action) => {
      state = action.payload;
      return state;
    },
    addStoreSlice: (state: any, action) => {
      state.push(action.payload);
      return state;
    },
    editStoreSlice: (state: any, action) => {
      state = state.map((i: any) => (i.id == action.payload.id ? action.payload : i));
      return state;
    },
    deleteStoreSlice: (state: any, action) => {
      state = state.filter((i: any) => i.id !== action.payload);
      return state;
    }
  }
});
export const { getStoresSlice, addStoreSlice, editStoreSlice, deleteStoreSlice } = stores.actions;
export default stores.reducer;
