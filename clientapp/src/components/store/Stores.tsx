import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { GET_STORES, CREATE_STORE_BY_NAME, DELETE_STORE_BY_NAME } from '../../redux/types/index';
import Store from '../../models/Store';
import { ApplicationState } from '../../Store';
import { setStoreSlice } from '../../redux/slice/stores/Store';
import { nanoid } from '@reduxjs/toolkit';
import { useStore } from '../common/hooks/useStore';

interface IStores extends RouteComponentProps<any> {}

const Stores = (props: IStores) => {
  const stores = useSelector<ApplicationState, Store[]>((state) => state.stores.stores);
  const store = useSelector<ApplicationState, Store>((state) => state.store);
  const dispatch = useDispatch();

  const { handleStoreChange, handleStoreSubmit } = useStore();

  useEffect(() => {
    dispatch({ type: GET_STORES });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <p>Stores Page</p>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label="Store name"
          variant="outlined"
          value={store.name}
          onChange={(e) => handleStoreChange(e, 'name')}
        />
        <Button variant="contained" onClick={handleStoreSubmit}>
          Submit
        </Button>
      </Grid>
      <Grid item xs={12}>
        {stores.map((store: Store) => (
          <div key={nanoid(8)}>
            {store.name}
            {'   '}
            <Button
              variant="contained"
              role="deleteStore"
              onClick={() => dispatch({ type: DELETE_STORE_BY_NAME, name: store.name })}>
              Delete
            </Button>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default withRouter(Stores);
