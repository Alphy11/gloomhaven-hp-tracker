import React from 'react';
import VCenter from 'Util/VCenter';
import { createStyleSheet } from 'Util/css';

import ListRow from './ListRow';

const styles = createStyleSheet({
  header: {
    border: 'solid 1px blue',
    backgroundColor: 'dodgerblue',
    fontSize: '64px',
  },
});

function ListHeader({ children }) {
  return (
    <ListRow addedStyles={[styles.header]} >
      <VCenter>
        {children}
      </VCenter>
    </ListRow>);
}

export default ListHeader;
