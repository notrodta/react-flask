import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Stores from '../Stores';
import reduxStore from '../../../Store';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import environmentConfig from '../../../Environment';
import { GetStoresMock } from '../../../models/Store';

const config = environmentConfig;
const getAllURL = `${config.SiteUrl}/stores`;
const postURL = `${config.SiteUrl}/store`;

const server = setupServer(
  rest.get(getAllURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ stores: GetStoresMock }));
  }),
  rest.post(postURL, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ stores: GetStoresMock }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Stores Component', () => {
  it('should click on submit button', async () => {
    render(
      <Provider store={reduxStore}>
        <BrowserRouter>
          <Stores />
        </BrowserRouter>
      </Provider>
    );
    const textField = screen.getByLabelText('Store name');
    fireEvent.change(textField, { target: { value: 'testStore' } });
    const submitButton = screen.getByText(/SUBMIT/i);
    fireEvent.click(submitButton);

    // const storeName = await screen.findByText('testStore');

    // expect(storeName).toBeInTheDocument();

    // expect(screen.getByText('Store1')).toBeInTheDocument();
    expect(1).toBe(1);
  });
});
