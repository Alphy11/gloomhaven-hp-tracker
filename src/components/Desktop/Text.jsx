import React from 'react';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  text: {
    fontSize: '32px',
    fontWeight: 'bold',
    float: 'left',
  },
});

function Text({ children }) {
  return <div {...css(styles.text)}>{children}</div>;
}

export default Text;
