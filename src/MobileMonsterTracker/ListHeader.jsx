import React from 'react';
import ListRow from './ListRow';

function ListHeader({ children }) {
  return (
    <ListRow>{children}</ListRow>
  )
}

export default ListHeader;