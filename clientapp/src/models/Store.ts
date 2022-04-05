import Item from './Item';
import { GetItem1Mock, GetItem2Mock } from './Item';

export default interface Store {
  id?: number;
  name: string;
  Items?: Item[];
}

export const GetStoresMock: Store[] = [
  {
    id: 1,
    name: 'store1',
    Items: [GetItem1Mock, GetItem2Mock]
  },
  {
    id: 2,
    name: 'store2',
    Items: [GetItem1Mock, GetItem2Mock]
  }
];
