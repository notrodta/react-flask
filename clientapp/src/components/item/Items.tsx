import React, { useEffect } from 'react';
import StoreService from '../../services/StoreService';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IItems extends RouteComponentProps<any> {}

const Items = (props: IItems) => {
  useEffect(() => {
    StoreService.getAll().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <p>Item !!!</p>
      </Grid>
      <Grid item xs={6}>
        <TextField id="outlined-basic" label="Store name" variant="outlined" />
      </Grid>
    </Grid>
  );
};

export default withRouter(Items);
