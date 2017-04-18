import React from 'react';
import ListRow from './ListRow';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  item: {
    border: 'solid 1px blue',
    backgroundColor: 'lightblue',
    opacity: '0.5',
  }
})

function ListItem({ children }) {
  return (
    <ListRow addedStyles={[styles.item]} >
      {children}
    </ListRow>);
}


export default ListItem;