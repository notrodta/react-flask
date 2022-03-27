import React, { useEffect } from 'react';
import StoreService from '../services/StoreService';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const Store = () => {
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
        <p>Store</p>
      </Grid>
      <Grid item xs={6}>
        <TextField id="outlined-basic" label="Store name" variant="outlined" />
      </Grid>
    </Grid>
  );
};

export default Store;
