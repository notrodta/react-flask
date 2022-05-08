import { configureStore } from '@reduxjs/toolkit';
import stores, { StoresState } from './redux/slice/stores/Stores';
import store from './redux/slice/stores/Store';
import item from './redux/slice/item/Item';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './redux/sagas';
import Store from './models/Store';
import Item from './models/Item';

export interface ApplicationState {
  store: Store;
  stores: StoresState;
  item: Item;
}

const sagaMiddleware = createSagaMiddleware();
const reduxStore = configureStore({
  reducer: {
    store: store,
    stores: stores,
    item: item
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});
sagaMiddleware.run(rootSaga);

export default reduxStore;
