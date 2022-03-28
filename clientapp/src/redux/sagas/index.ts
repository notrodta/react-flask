import { all } from 'redux-saga/effects';
import { watchStoresAsync } from './stores/store';

export function* rootSaga() {
  yield all([watchStoresAsync()]);
}
