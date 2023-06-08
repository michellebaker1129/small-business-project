import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import client from "./apollo/apolloClient";
import { AuthProvider } from "./context/authContext";
import { NotificationProvider } from "./context/notificationContext";
import { MessageProvider } from "./context/messageContext";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <MessageProvider>
      <NotificationProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BrowserRouter>
        </ApolloProvider>
      </NotificationProvider>
    </MessageProvider>
  </AuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
