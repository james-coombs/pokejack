// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import configureStore from "./store";
// import "./index.css";
// import App from "./App";
// import serviceWorker from "./serviceWorker";

// ReactDOM.render(
//   <Provider store={configureStore()}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );

// serviceWorker();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
