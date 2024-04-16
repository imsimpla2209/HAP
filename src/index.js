import React from 'react';
import { createRoot } from 'react-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import {store} from "./app/store"
const container = document.getElementById('root');

ReactDOM.render(
      <Provider store={store}>
            <App />
      </Provider>,
			document.getElementById("root")
);
