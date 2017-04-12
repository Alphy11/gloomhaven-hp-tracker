import React from 'react';
import ListView from './ListView';
import ListItem from './ListItem';
import MonsterListView from './MonsterListView';

import { css, createStyleSheet } from 'Util/css';
import { withRouter } from 'react-router';

const styles = createStyleSheet({
  top: {
    margin: '-8px',
  }
})

function page() {

  return (
    <div {...css(styles.top)}>
      <MonsterListView />
    </div>);
}

export default withRouter(page);