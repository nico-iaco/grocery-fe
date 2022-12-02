import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './page/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {eventReducer} from "./reducer/Reducer";
import {configureStore} from "@reduxjs/toolkit";
import {AnalyticsComponent} from './component/AnalyticsComponent';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from "redux-persist/integration/react";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, eventReducer)


const store = configureStore({
    reducer: persistedReducer
});

const persistor = persistStore(store)

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
              <BrowserRouter>
                  <AnalyticsComponent />
                  <App />
              </BrowserRouter>
          </PersistGate>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
