import React from 'react';
import ListView from './ListView';
import ListItem from './ListItem';
import MonsterListView from './MonsterListView';

import { withRouter } from 'react-router';

function page() {

  return <MonsterListView />
}

export default withRouter(page);