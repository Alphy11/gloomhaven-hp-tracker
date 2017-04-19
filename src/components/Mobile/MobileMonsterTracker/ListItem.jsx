import React from 'react';
import { createStyleSheet } from 'Util/css';
import ListRow from './ListRow';

const styles = createStyleSheet({
  item: {
    border: 'solid 1px blue',
    backgroundColor: 'lightblue',
    opacity: '0.5',
  },
});

function ListItem({ children }) {
  return (
    <ListRow addedStyles={[styles.item]} >
      {children}
    </ListRow>);
}


export default ListItem;
