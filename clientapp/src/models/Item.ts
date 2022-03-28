import Store from './Store';

export default interface Item {
  id?: number;
  name: string;
  price: number;
  storeId: number;
  Store?: Store;
}
