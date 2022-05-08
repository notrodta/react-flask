import reduxStore from './Store';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {}
});

export function renderWithReduxAndRouter(
  ui,
  { preloadedState, store = reduxStore(), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}


export function renderWithThemeAndReduxAndRouter(
  ui,
  { preloadedState, store = reduxStore(), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
