import { createSlice } from '@reduxjs/toolkit';
import Store from '../../../models/Store';

const initialState: Store = {
  name: ''
};

const store = createSlice({
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
