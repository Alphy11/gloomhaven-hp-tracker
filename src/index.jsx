import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import MonsterTracker from './MonsterTracker'
import MobileMonsterTracker from './MobileMonsterTracker';
import { uri, wsUri } from '../endpoint';

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
      <Switch>
        <Route path='/mobile' component={MonsterTracker} />
        <Route path='/' component={MobileMonsterTracker} />
      </Switch>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('app')
)
