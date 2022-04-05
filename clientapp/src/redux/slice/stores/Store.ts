import { createSlice } from '@reduxjs/toolkit';
import Store from '../../../models/Store';

const initialState: Store = {
  name: ''
};

export const store = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStoreSlice: (state, action) => {
      state = action.payload;
      return state;
    }
  }
});
export const { setStoreSlice } = store.actions;
export default store.reducer;
