import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createHashHistory';
import { ApolloProvider } from 'react-apollo';
import { createStore } from 'redux';

import MonsterTracker from './components/Desktop/MonsterTracker';
import MobileMonsterTracker from './components/Mobile/MobileMonsterTracker';
import AddMonster from './components/Desktop/AddMonster';
import reducer from './reducers';
import client from './client';

const store = createStore(reducer);

ReactDOM.render((
  <ApolloProvider store={store} client={client}>
    <Router history={createHistory()}>
      <Switch>
        <Route path="/nonmobile/add" component={AddMonster} />
        <Route path="/nonmobile" component={MonsterTracker} />
        <Route path="/mobile" component={MobileMonsterTracker} />
        <Route path="/" component={MonsterTracker} />
      </Switch>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('app'), // eslint-disable-line no-undef
);
