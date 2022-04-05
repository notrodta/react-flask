import { configureStore } from '@reduxjs/toolkit';
import stores, { StoresState } from './redux/slice/stores/Stores';
import store from './redux/slice/stores/Store';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './redux/sagas';
import Store from './models/Store';

export interface ApplicationState {
  store: Store;
  stores: StoresState;
}

const sagaMiddleware = createSagaMiddleware();
const reduxStore = configureStore({
  reducer: {
    store: store,
    stores: stores
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});
sagaMiddleware.run(rootSaga);

export default reduxStore;
