import React from "react";
import ReactDOM from "react-dom";
import { 
  ApolloProvider, 
  ApolloClient, 
  InMemoryCache,
  HttpLink
} from '@apollo/client'
import { Router, Redirect} from "react-router-dom";
 
import App from "./App";
import Provider from "./provider";
import { createBrowserHistory } from 'history'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://178.62.86.168/v1/graphql",
  }),
});

const hist = createBrowserHistory();

const container = (
  <ApolloProvider client={apolloClient}>
    <Provider>
        <Router history={hist}>
          <App />
          <Redirect from="/" to="/today" />
        </Router>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(container, document.getElementById("root"));