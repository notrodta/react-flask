import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import constants from '../Constants';
import Stores from '../components/store/Stores';
import Item from '../components/item/Item';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={`${constants.routePath.store}/:id`} component={Item} />
        <Route path={constants.routePath.home} component={Stores} />
        <Route exact path={constants.routePath.home}>
          <Stores />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
