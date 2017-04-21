import React from 'react';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  text: {
    fontSize: '32px',
    fontWeight: 'bold',
    float: 'left',
  },
  error: {
    fontSize: '16px',
    color: 'red',
    float: 'left',
  },
});

function Text({ type, children }) {
  const style = styles[type];
  return <div {...css(style)}>{children}</div>;
}

Text.defaultProps = {
  type: 'text',
};

export default Text;
