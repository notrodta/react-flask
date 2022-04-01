import { rest } from 'msw';
import environmentConfig from '../Environment';
import { GetStoresMock } from '../models/Store';

const config = environmentConfig;
const getAllStoreURL = `${config.SiteUrl}/stores`;
const postStoreURL = `${config.SiteUrl}/store/testStore`;
const deleteStoreURL = `${config.SiteUrl}/store/store1`;

export const storeServiceHandler = [
  rest.get(getAllStoreURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ stores: GetStoresMock }));
  }),
  rest.post(postStoreURL, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: 3 }));
  }),
  rest.delete(deleteStoreURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'STORE_DELETED' }));
  })
];
