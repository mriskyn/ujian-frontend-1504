import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers";
import "bootstrap/dist/css/bootstrap.min.css";

const globalState = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
globalState.subscribe(() =>
  console.log("Global State:", globalState.getState())
);

ReactDOM.render(
  <Provider store={globalState}>
    <App />
  </Provider>,
  document.getElementById("root")
);
