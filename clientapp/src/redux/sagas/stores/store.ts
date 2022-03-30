import { put, takeEvery, call, all } from 'redux-saga/effects';
import { setStoreSlice } from '../../slice/stores/Store';
import {
  getStoresSlice,
  addStoreSlice,
  editStoreSlice,
  deleteStoreSlice
} from '../../slice/stores/Stores';
import storeService from '../../../services/StoreService';
import { GET_STORES, CREATE_STORE, DELETE_STORE_BY_NAME } from '../../types/index';

export function* getStoreSaga(): any {
  const stores = yield call(storeService.getAll);
  console.log(stores);
  yield put(getStoresSlice(stores));
}

export function* createStoreSaga(action: any): any {
  // yield storeService.post(action.store.name); // this also works
  try {
    const store = yield call(storeService.post, action.store.name);
    console.log(store);
    yield put(addStoreSlice(action.store));
  } catch (error) {
    console.log('tes123t');
    console.log(error);
  }
}

export function* createStoreByNameSaga(action: any): any {
  yield call(storeService.delete, action.name);
  yield put(deleteStoreSlice(action.name));
}

export function* watchStoresAsync() {
  //this also works
  // yield takeEvery(GET_STORES, getStoreSaga);
  // yield takeEvery(CREATE_STORE, createStoreSaga);
  // yield takeEvery(DELETE_STORE_BY_NAME, createStoreByNameSaga);
  yield all([
    takeEvery(GET_STORES, getStoreSaga),
    takeEvery(CREATE_STORE, createStoreSaga),
    takeEvery(DELETE_STORE_BY_NAME, createStoreByNameSaga)
  ]);

  // yield takeEvery(GET_USERS, getUsersSaga)
  // yield takeEvery(GET_USER_BY_ID, getUserByIdSaga)
  // yield takeEvery(CREATE_USER, createUserSaga)
  // yield takeEvery(UPDATE_USER_BY_ID, updateUserSaga)
  // yield takeEvery(DELETE_USER_BY_ID, deleteUserByIdSaga)
}
