import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import reduxStore from './Store';
import Routes from './routes/Routes';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

export default App;
