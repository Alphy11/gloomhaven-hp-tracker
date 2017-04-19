import React from 'react';
import PropTypes from 'prop-types';
import { css, createStyleSheet } from 'Util/css';

const totalSections = 12;

const styles = createStyleSheet({
  section: {
    height: '100%',
    float: 'left',
    display: 'inline-block',
  },
});

function ListSection({ children, sections }) {
  const dynamicStyles = createStyleSheet({
    sectionWidth: {
      width: `${(sections / totalSections) * 100}%`,
    },
  });

  return <div {...css(dynamicStyles.sectionWidth, styles.section)}>{children}</div>;
}

ListSection.propTypes = {
  children: PropTypes.node.isRequired,
  sections: PropTypes.number,
};

ListSection.defaultProps = {
  sections: 1,
};

export default ListSection;
