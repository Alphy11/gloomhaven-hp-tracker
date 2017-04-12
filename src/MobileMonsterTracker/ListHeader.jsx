import React from 'react';
import ListRow from './ListItem';

function ListHeader({ children }) {
  return (
    <ListRow>{children}</ListRow>
  )
}

export default ListHeader;