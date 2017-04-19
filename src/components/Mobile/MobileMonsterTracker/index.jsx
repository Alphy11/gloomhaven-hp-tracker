import React from 'react';
import { withRouter } from 'react-router';
import { css, createStyleSheet } from 'Util/css';
import MonsterListView from './MonsterListView';

const styles = createStyleSheet({
  top: {
    margin: '-8px -8px -8px -8px',
  },
});

function page() {
  return (
    <div {...css(styles.top)}>
      <MonsterListView />
    </div>);
}

export default withRouter(page);
