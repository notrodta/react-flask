import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import constants from '../constants';
import Stores from '../components/store/Stores';
import Items from '../components/item/Items';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={constants.routePath.item} component={Items} />
        <Route path={constants.routePath.home} component={Stores} />
        <Route exact path={constants.routePath.home}>
          <Stores />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
