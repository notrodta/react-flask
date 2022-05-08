import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Stores from '../Stores';
import reduxStore from '../../../Store';
import { BrowserRouter } from 'react-router-dom';
import { renderWithReduxAndRouter } from '../../../testUtils';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import environmentConfig from '../../../Environment';
// import { GetStoresMock } from '../../../models/Store';

// const config = environmentConfig;
// const getAllURL = `${config.SiteUrl}/stores`;
// const postURL = `${config.SiteUrl}/store/testStore`;
// const deleteURL = `${config.SiteUrl}/store/testStore`;

// //TODO: Refactor: create a server.tx file and call setupServer in setupTest.ts
// //https://www.youtube.com/watch?v=oMv2eAGWtZU&ab_channel=TechCheck
// const server = setupServer(
//   rest.get(getAllURL, (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ stores: GetStoresMock }));
//   }),
//   rest.post(postURL, (req, res, ctx) => {
//     return res(ctx.status(201), ctx.json({ id: 3 }));
//   }),
//   rest.delete(deleteURL, (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ message: 'STORE_DELETED' }));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());


// Difference between, get, query and find
// https://levelup.gitconnected.com/the-difference-between-get-find-query-react-testing-library-bcd996ba3baa
describe('Stores Component', () => {
  it('should show new store after clicking on submit button', async () => {
    renderWithReduxAndRouter(<Stores />);

    const textField = await screen.findByLabelText('Store name');
    fireEvent.change(textField, { target: { value: 'testStore' } });
    const submitButton = await screen.findByText(/SUBMIT/i);
    fireEvent.click(submitButton);

    const storeName = await screen.findByText('testStore');

    expect(storeName).toBeInTheDocument();
  });
  it('should delete store1 successfully', async () => {
    renderWithReduxAndRouter(<Stores />);

    const deleteButtons = await screen.findAllByRole('deleteStore');
    fireEvent.click(deleteButtons[0]);

    const store1 = await screen.findByText('store1');

    expect(store1).toBeNull;
  });
});
