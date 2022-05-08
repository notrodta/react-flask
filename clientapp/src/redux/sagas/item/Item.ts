import { put, takeEvery, call, all } from 'redux-saga/effects';
import { CREATE_ITEM_BY_NAME } from '../../types/index';
import itemService from '../../../services/ItemService';

export function* createItemSaga(action: any): any {
  console.log(action.item);
  try {
    const item = yield call(itemService.post, action.item.name, action.item);
    console.log(item);
  } catch (error) {
    console.log(error);
  }
}

export function* watchItemAsync() {
  yield all([takeEvery(CREATE_ITEM_BY_NAME, createItemSaga)]);
}
