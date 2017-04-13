import React from 'react';
import PropTypes from 'prop-types';
import { css, createStyleSheet } from '../Util/css';

function VCenter({children}) {
  const styles = createStyleSheet({
    wrapper: {
      width: '100%',
      display: 'table',
      height: '100%',
    },
    inner: {
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'center',
    }
  });
  return (
    <div {...css(styles.wrapper)}>
      <div {...css(styles.inner)}>
       {children}
      </div>
    </div>);
}

VCenter.propTypes = {
  children: PropTypes.node.isRequired,
}

export default VCenter;