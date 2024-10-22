import ReactDOM from 'react-dom/client';
import './index.css';
import App from './page/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {eventReducer} from "./reducer/Reducer";
import {configureStore} from "@reduxjs/toolkit";
import {AnalyticsComponent} from './component/AnalyticsComponent';
import React from 'react';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const store = configureStore({
    reducer: eventReducer
});


root.render(
  <React.StrictMode>
      <Provider store={store}>
              <BrowserRouter>
                  <AnalyticsComponent />
                  <App />
              </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//onCLS(sendToAnalytics);
//onINP(sendToAnalytics);
//onLCP(sendToAnalytics);
