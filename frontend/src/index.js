import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/'
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session'
import * as spotActions from './store/spots'
import { ModalProvider } from './context/Modal';
import 'typeface-montserrat'
import './index.css'

const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF()

  window.spotActions = spotActions
  window.store = store
  window.csrfFetch = csrfFetch
  window.sessionActions = sessionActions
}

const Root = () => {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
