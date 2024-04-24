import React from 'react';
import { createRoot } from 'react-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from "./app/store"
import { BrowserRouter } from 'react-router-dom';
const container = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter >
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
