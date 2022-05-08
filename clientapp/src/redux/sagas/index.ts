import { all } from 'redux-saga/effects';
import { watchStoresAsync } from './stores/Store';
import { watchItemAsync } from './item/Item';

export function* rootSaga() {
  yield all([watchStoresAsync(), watchItemAsync()]);
}
