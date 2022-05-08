import { createSlice } from '@reduxjs/toolkit';
import Item from '../../../models/Item';

export const initialState: Item = {
  name: '',
  price: 0,
  store_id: 0
};

export const item = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItemSlice: (state, action) => {
      state = action.payload;
      console.log(state);
      return state;
    },
    setItemNameSlice: (state, action) => {
      state = action.payload;
      return state;
    },
    setItemPriceSlice: (state, action) => {
      state = action.payload;
      return state;
    },
    setItemStoreIdSlice: (state, action) => {
      state = action.payload;
      return state;
    }
  }
});
export const { setItemSlice, setItemNameSlice, setItemPriceSlice, setItemStoreIdSlice } =
  item.actions;
export default item.reducer;
