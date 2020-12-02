import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// use test data on frontend (service worker, will not work in codesandbox)
// const { worker } = require("./mocks/browser");
// worker.start();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
