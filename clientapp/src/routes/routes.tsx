import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Constants from '../Constants';
import Stores from '../components/store/Stores';
import Items from '../components/item/Items';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Constants.routePath.item} component={Items} />
        <Route path={Constants.routePath.home} component={Stores} />
        <Route exact path={Constants.routePath.home}>
          <Stores />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
