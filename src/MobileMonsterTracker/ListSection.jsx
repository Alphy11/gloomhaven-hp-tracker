import React from 'react';
import PropTypes from 'prop-types';
import { css, createStyleSheet } from 'Util/css';

const totalSections = 12;

function ListSection({ children, sections }) {
  const styles = createStyleSheet({
    section: {
      width: '${sections/totalSections}%',
    }
  })

  return <div {...css(styles.section)}>{children}</div>
}

ListSection.propTypes = {
  children: PropTypes.node.isRequired,
  sections: PropTypes.number,
}

ListSection.defaultProps = {
  sections: 1,
}

export default ListSection;