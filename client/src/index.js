import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { UserAuth } from "./context/AuthContext";
import { store } from "./redux/store/store";
import { ContextCart } from "./context/Carts";
import { ContextSearch } from "./context/search";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextCart>
        <UserAuth>
          <ContextSearch>
            <App />
          </ContextSearch>
        </UserAuth>
      </ContextCart>
    </Provider>
  </React.StrictMode>
);
