import { put, takeEvery } from 'redux-saga/effects';
import { setStoreSlice } from '../../slice/stores/Store';
import {
  getStoresSlice,
  addStoreSlice,
  editStoreSlice,
  deleteStoreSlice
} from '../../slice/stores/Stores';
import storeService from '../../../services/StoreService';
import { Get_STORES } from '../../types/index';
import axios, { AxiosResponse } from 'axios';

export const getUsersAPI = async () => axios.get('/users');

// export const getUsersAPI = async () =>
//   axios.get('/users').then((response: AxiosResponse) => {
//     return response ? response.data : {};
//   });

export function* getStoreSaga(action: any): any {
  // const stores = yield getUsersAPI();
  const stores = yield storeService.getAll();
  yield put(getStoresSlice(stores));
  // yield createUserAPI(action.user);
  // yield put(addUserSlice(action.user));
  //Create post service in StoreService
}

export function* watchStoresAsync() {
  yield takeEvery(Get_STORES, getStoreSaga);
  // yield takeEvery(GET_USERS, getUsersSaga)
  // yield takeEvery(GET_USER_BY_ID, getUserByIdSaga)
  // yield takeEvery(CREATE_USER, createUserSaga)
  // yield takeEvery(UPDATE_USER_BY_ID, updateUserSaga)
  // yield takeEvery(DELETE_USER_BY_ID, deleteUserByIdSaga)
}
