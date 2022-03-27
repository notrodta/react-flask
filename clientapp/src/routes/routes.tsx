import React from 'react';
// import { Route, Switch } from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Constants from '../Constants';
import Store from '../components/store/Store';
import Item from '../components/item/Items';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Constants.routePath.item} component={Item} />
        <Route path={Constants.routePath.home} component={Store} />
        <Route exact path={Constants.routePath.home}>
          <Store />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
