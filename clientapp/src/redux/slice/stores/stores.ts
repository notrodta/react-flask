import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Store from '../../../models/Store';

export interface StoresState {
  stores: Store[];
}

const initialState: StoresState = {
  stores: []
};

const stores = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    getStoresSlice: (state: StoresState, action: PayloadAction<StoresState>) => {
      state = action.payload;
      return state;
    },
    addStoreSlice: (state: StoresState, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
      return state;
    },
    editStoreSlice: (state: any, action) => {
      //fix this: should map by name instead of id
      // state = state.map((i: any) => (i.id == action.payload.id ? action.payload : i));
      return state;
    },
    deleteStoreSlice: (state: StoresState, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((i: any) => i.name !== action.payload);
      return state;
    }
  }
});
export const { getStoresSlice, addStoreSlice, editStoreSlice, deleteStoreSlice } = stores.actions;
export default stores.reducer;
