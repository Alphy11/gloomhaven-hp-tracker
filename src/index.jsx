import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import MonsterTracker from './MonsterTracker'
import { uri, wsUri } from '../endpoint.js';

const networkInterface = createNetworkInterface({ uri })
const wsClient = new SubscriptionClient(wsUri);
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({ networkInterface: networkInterfaceWithSubscriptions })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={createHistory()}>
        <Route path='/' component={MonsterTracker} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('app')
)
