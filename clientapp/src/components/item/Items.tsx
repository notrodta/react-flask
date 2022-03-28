import React, { useEffect } from 'react';
import StoreService from '../../services/StoreService';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from '@mui/material/Button';

interface IItems extends RouteComponentProps<any> {}

const Items = (props: IItems) => {
  const handleItemNameChange = (e: any) => {
    console.log(e.target.value);
  };

  const handleItemPriceChange = (e: any) => {
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  useEffect(() => {
    StoreService.getAll().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <p>Items Page</p>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="Item name"
          variant="outlined"
          onChange={handleItemNameChange}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          onChange={handleItemPriceChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default withRouter(Items);
