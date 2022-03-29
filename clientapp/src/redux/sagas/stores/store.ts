import { put, takeEvery } from 'redux-saga/effects';
import { setStoreSlice } from '../../slice/stores/Store';
import {
  getStoresSlice,
  addStoreSlice,
  editStoreSlice,
  deleteStoreSlice
} from '../../slice/stores/Stores';
import storeService from '../../../services/StoreService';
import { GET_STORES, CREATE_STORE } from '../../types/index';

export function* getStoreSaga(): any {
  const stores = yield storeService.getAll();
  yield put(getStoresSlice(stores));
}

export function* createStoreSaga(action: any): any {
  yield storeService.post(action.store.name);
  yield put(addStoreSlice(action.store));
}

export function* watchStoresAsync() {
  yield takeEvery(GET_STORES, getStoreSaga);
  yield takeEvery(CREATE_STORE, createStoreSaga);

  // yield takeEvery(GET_USERS, getUsersSaga)
  // yield takeEvery(GET_USER_BY_ID, getUserByIdSaga)
  // yield takeEvery(CREATE_USER, createUserSaga)
  // yield takeEvery(UPDATE_USER_BY_ID, updateUserSaga)
  // yield takeEvery(DELETE_USER_BY_ID, deleteUserByIdSaga)
}
