import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import reduxStore from './Store';
import Routes from './routes/routes';

function App() {
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
