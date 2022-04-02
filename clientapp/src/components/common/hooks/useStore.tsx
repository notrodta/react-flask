import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Store from '../../../models/Store';
import { setStoreSlice } from '../../../redux/slice/stores/Store';
import { CREATE_STORE_BY_NAME } from '../../../redux/types';
import { ApplicationState } from '../../../Store';

/*
  When to test custom hooks?:
  - You're writing a library with one or more custom hooks that are not directly tied to a component
  - You have a complex hook that is difficult to test through component interactions

  When not to test custom hooks?
  - Your hook is defined alongside a component and is only used there
  - Your hook is easy to test by just testing the components using it

  In this case, our custom hooks is defined alongisde a component and is only used there, 
  therefore, we dont need to test it.
*/
export const useStore = () => {
  const store = useSelector<ApplicationState, Store>((state) => state.store);
  const dispatch = useDispatch();

  const handleStoreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    dispatch(setStoreSlice({ ...store, [prop]: e.target.value }));
  };

  const handleStoreSubmit = () => {
    dispatch({ type: CREATE_STORE_BY_NAME, store });
    const newStore = {} as Store;
    newStore.name = '';
    dispatch(setStoreSlice({ ...newStore }));
  };

  return {
    handleStoreChange,
    handleStoreSubmit
  };
};
