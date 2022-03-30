import { call, put } from 'redux-saga/effects';
import { watchStoresAsync, getStoreSaga, createStoreSaga, createStoreByNameSaga } from '../Store';
import { GetStoresMock } from '../../../../models/Store';
import storeService from '../../../../services/StoreService';
import {
  StoresState,
  getStoresSlice,
  addStoreSlice,
  editStoreSlice,
  deleteStoreSlice
} from '../../../slice/stores/Stores';

describe('getStoreSaga', () => {
  it('success triggers success action with store', () => {
    const state: StoresState = {
      stores: GetStoresMock
    };

    const generator = getStoreSaga();
    const response = { stores: GetStoresMock };
    expect(generator.next().value).toEqual(call(storeService.getAll));
    expect(generator.next(response).value).toEqual(put(getStoresSlice(state)));
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });
});