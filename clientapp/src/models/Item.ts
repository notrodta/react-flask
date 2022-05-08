import Store from './Store';

export default interface Item {
  id?: number;
  name: string;
  price: number;
  store_id: number;
  Store?: Store;
}

export const GetItem1Mock: Item = {
  id: 1,
  name: 'item1',
  price: 10,
  store_id: 1
};

export const GetItem2Mock: Item = {
  id: 2,
  name: 'item2',
  price: 15,
  store_id: 1
};
