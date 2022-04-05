import { all } from 'redux-saga/effects';
import { watchStoresAsync } from './stores/Store';

export function* rootSaga() {
  yield all([watchStoresAsync()]);
}
