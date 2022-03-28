import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import StoreService from '../../services/StoreService';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface IStores extends RouteComponentProps<any> {}

const Stores = (props: IStores) => {
  const handleStoreNameChange = (e: any) => {
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  useEffect(() => {
    // const headers = { 'Content-Type': 'application/json' };
    // fetch('http://127.0.0.1:5000/items', { headers })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    StoreService.getAll().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <p>Stores Page</p>
      </Grid>
      <Grid item xs={6}>
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
    </Grid>
  );
};

export default withRouter(Stores);
