import { put, takeEvery } from 'redux-saga/effects';
import { setStoreSlice } from '../../slice/stores/Store';
import {
  getStoresSlice,
  addStoreSlice,
  editStoreSlice,
  deleteStoreSlice
} from '../../slice/stores/Stores';
import storeService from '../../../services/StoreService';
import { CREATE_STORE } from '../../types/index';

export function* createStoreSaga(action: any) {
  // yield createUserAPI(action.user);
  // yield put(addUserSlice(action.user));
  //Create post service in StoreService
}

export function* watchStoresAsync() {
  yield takeEvery(CREATE_STORE, createStoreSaga);
  // yield takeEvery(GET_USERS, getUsersSaga)
  // yield takeEvery(GET_USER_BY_ID, getUserByIdSaga)
  // yield takeEvery(CREATE_USER, createUserSaga)
  // yield takeEvery(UPDATE_USER_BY_ID, updateUserSaga)
  // yield takeEvery(DELETE_USER_BY_ID, deleteUserByIdSaga)
}
