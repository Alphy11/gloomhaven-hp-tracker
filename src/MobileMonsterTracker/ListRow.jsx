import React from 'react';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  row: {
    width: '100%',
    height: `${100/12}%`,
  }
})

function ListRow({ addedStyles, children }) {
  const styleList = [...addedStyles, styles.row];
  return <div {...css(styleList)} >
    {children}
  </div>
}

ListRow.defaultProps= {
  addedStyles: [],
}

export default ListRow;