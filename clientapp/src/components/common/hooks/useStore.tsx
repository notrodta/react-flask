import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Store from '../../../models/Store';
import { setStoreSlice } from '../../../redux/slice/stores/Store';
import { CREATE_STORE_BY_NAME } from '../../../redux/types';
import { ApplicationState } from '../../../Store';

export const useStoreInput = () => {
  const store = useSelector<ApplicationState, Store>((state) => state.store);
  const dispatch = useDispatch();

  const handleStoreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    dispatch(setStoreSlice({ ...store, [prop]: e.target.value }));
  };

  return {
    handleStoreChange
  };
};

export const useStoreSubmit = () => {
  const store = useSelector<ApplicationState, Store>((state) => state.store);
  const dispatch = useDispatch();

  const handleStoreSubmit = () => {
    dispatch({ type: CREATE_STORE_BY_NAME, store });
    const newStore = {} as Store;
    newStore.name = '';
    dispatch(setStoreSlice({ ...newStore }));
  };

  return {
    handleStoreSubmit
  };
};
