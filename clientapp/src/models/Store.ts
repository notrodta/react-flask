import Item from './Item';

export default interface Store {
  id?: number;
  name: string;
  Items?: Item[];
}
