import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Switch } from 'react-router';
import createHistory from 'history/createHashHistory';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import MonsterTracker from './MonsterTracker'
import MobileMonsterTracker from './MobileMonsterTracker';
import { uri, wsUri } from '../endpoint';
import AddMonster from './MonsterTracker/AddMonster';

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
        <Route path='/nonmobile/add' component={AddMonster} />
        <Route path='/nonmobile' component={MonsterTracker} />
        <Route path='/mobile' component={MobileMonsterTracker} />
        <Route path='/' component={MonsterTracker} />
      </Switch>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('app')
)
