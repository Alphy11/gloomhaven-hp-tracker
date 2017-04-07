import React from 'react';
import { css, createStyleSheet } from '../Util/css';

function Section({children, sectionsTaken, totalSections}) {
  const styles = createStyleSheet({
    section: {
      width: `${sectionsTaken/totalSections * 100}%`,
      float: 'left',
      display: 'inline-block',
    }
  });
  return <div {...css(styles.section)}> {children} </div>
}

Section.propTypes = {
  children: React.PropTypes.node.isRequired,
  sectionsTaken: React.PropTypes.number,
  totalSections: React.PropTypes.number,
}

Section.defaultProps = {
  sectionsTaken: 1,
  totalSections: 2
}

export default Section;