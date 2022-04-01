import { setupServer } from 'msw/node';
import { storeServiceHandler } from './StoreServiceHandler';

export const server = setupServer(...storeServiceHandler);
