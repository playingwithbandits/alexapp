import React from "react";
import ReactDOM from "react-dom";
import { 
  ApolloProvider, 
  ApolloClient, 
  InMemoryCache,
  HttpLink
} from '@apollo/client'
 
import App from "./App";
import Provider from "./provider";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://178.62.86.168/v1/graphql",
  }),
});

const container = (
  <ApolloProvider client={apolloClient}>
    <Provider>
        <App />
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(container, document.getElementById("root"));