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
const postURL = `${config.SiteUrl}/store/testStore`;
const deleteURL = `${config.SiteUrl}/store/testStore`;

const server = setupServer(
  rest.get(getAllURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ stores: GetStoresMock }));
  }),
  rest.post(postURL, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: 3 }));
  }),
  rest.delete(deleteURL, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: 'STORE_DELETED' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Stores Component', () => {
  it('should show new store after clicking on submit button', async () => {
    render(
      <Provider store={reduxStore}>
        <BrowserRouter>
          <Stores />
        </BrowserRouter>
      </Provider>
    );
    const textField = await screen.getByLabelText('Store name');
    fireEvent.change(textField, { target: { value: 'testStore' } });
    const submitButton = await screen.getByText(/SUBMIT/i);
    fireEvent.click(submitButton);

    const storeName = await screen.findByText('testStore');

    expect(storeName).toBeInTheDocument();
  });
  // it('should delete store1 successfully', async () => {
  //   render(
  //     <Provider store={reduxStore}>
  //       <BrowserRouter>
  //         <Stores />
  //       </BrowserRouter>
  //     </Provider>
  //   );
  //   const textField = await screen.getByLabelText('Store name');
  //   fireEvent.change(textField, { target: { value: 'testStore' } });
  //   const submitButton = await screen.getByText(/SUBMIT/i);
  //   fireEvent.click(submitButton);

  //   const storeName = await screen.findByText('testStore');

  //   expect(storeName).toBeInTheDocument();
  // });
});

// const SectionOne = screen.queryByText('Section 1')
// expect(SectionOne).toBeNull()
