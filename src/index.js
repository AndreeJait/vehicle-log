import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import routes from "./routes";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_URL
});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={routes}/>
        </ApolloProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
