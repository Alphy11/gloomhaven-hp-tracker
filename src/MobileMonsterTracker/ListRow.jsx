import React from 'react';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  row: {
    width: '100%',
    height: '50px',
  }
})

function ListRow({ children }) {
  return <div {...css(styles.row)} >
    {children}
  </div>
}


export default ListRow;