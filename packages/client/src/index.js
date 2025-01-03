import { ApolloProvider } from "@apollo/client";
import React from 'react';
import ReactDOM from 'react-dom/client';
import client from "./apolloClient";
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  </React.StrictMode>
);
