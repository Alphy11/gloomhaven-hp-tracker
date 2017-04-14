import React from 'react';
import ListRow from './ListRow';
import VCenter from 'Util/VCenter';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  header: {
    border: 'solid 1px blue',
    backgroundColor: 'dodgerblue',
    fontSize: '64px',
  }
})

function ListHeader({ children }) {
  return (
    <ListRow addedStyles={[styles.header]} >
      <VCenter>
        {children}
      </VCenter>
    </ListRow>);
}

export default ListHeader;