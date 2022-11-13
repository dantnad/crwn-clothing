//Libraries import
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
//Redux store import
import { store } from "./store/store";
//ReactRouter import
import { BrowserRouter } from "react-router-dom";
//App import
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
