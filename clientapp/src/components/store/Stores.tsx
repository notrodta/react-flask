import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import storeService from '../../services/StoreService';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Get_STORES } from '../../redux/types/index';
import Store from '../../models/Store';
import { ApplicationState } from '../../Store';

interface IStores extends RouteComponentProps<any> {}

const Stores = (props: IStores) => {
  const stores = useSelector<ApplicationState, Store[]>((state) => state.stores.stores);
  const dispatch = useDispatch();

  const handleStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  useEffect(() => {
    dispatch({ type: Get_STORES });
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
          onChange={handleStoreNameChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
      <Grid item xs={12}>
        {stores.map((store: Store) => (
          <div key={store.id}>{store.name}</div>
        ))}
      </Grid>
    </Grid>
  );
};

export default withRouter(Stores);
