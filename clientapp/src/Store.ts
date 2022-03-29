import { configureStore } from '@reduxjs/toolkit';
import stores from './redux/slice/stores/Stores';
import store from './redux/slice/stores/Stores';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './redux/sagas';
const sagaMiddleware = createSagaMiddleware();
const reduxStore = configureStore({
  reducer: {
    store,
    stores
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});
sagaMiddleware.run(rootSaga);

export default reduxStore;
