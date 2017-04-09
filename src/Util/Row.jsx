import React from 'react';
import PropTypes from 'prop-types';
import { css, createStyleSheet } from '../Util/css';

function Row({children}) {
  const styles = createStyleSheet({
    section: {
      width: `100%`,
      display: 'inline-block',
    }
  });
  return <div {...css(styles.section)}> {children} </div>
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Row;