import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../../../models/Item';
import {
  setItemNameSlice,
  setItemPriceSlice,
  setItemStoreIdSlice,
  setItemSlice
} from '../../../redux/slice/item/Item';
import { ApplicationState } from '../../../Store';
import { CREATE_ITEM_BY_NAME } from '../../../redux/types';

export const useItem = (storeId: number) => {
  const item = useSelector<ApplicationState, Item>((state) => state.item);
  const dispatch = useDispatch();

  console.log(item);

  useEffect(() => {
    dispatch(setItemStoreIdSlice({ ...item, ['store_id']: storeId }));
  }, [storeId]);

  const handleItemNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    dispatch(setItemNameSlice({ ...item, [prop]: e.target.value }));
  };

  const handleItemPriceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    dispatch(setItemPriceSlice({ ...item, [prop]: e.target.value }));
  };

  const handleSubmit = () => {
    dispatch({ type: CREATE_ITEM_BY_NAME, item });
    const newItem = {} as Item;
    newItem.name = '';
    newItem.price = 0;
    newItem.store_id = 0;
    dispatch(setItemSlice({ ...newItem }));
  };

  return {
    item,
    handleItemNameChange,
    handleItemPriceChange,
    handleSubmit
  };
};
