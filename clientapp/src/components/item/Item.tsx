import React, { useEffect } from 'react';
import storeService from '../../services/StoreService';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { withRouter, RouteComponentProps, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useItem } from './hooks/useItem';

interface IItem extends RouteComponentProps<any> {}

const Item = (props: IItem) => {
  let { id } = useParams() as any;

  const { item, handleItemNameChange, handleItemPriceChange, handleSubmit } = useItem(id);

  useEffect(() => {
    storeService.getAll().then((res) => {
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
          value={item.name}
          onChange={(e) => handleItemNameChange(e, 'name')}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={item.price}
          onChange={(e) => handleItemPriceChange(e, 'price')}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={6}>
        <p>TODO: Display list of items here:</p>
      </Grid>
    </Grid>
  );
};

export default withRouter(Item);
