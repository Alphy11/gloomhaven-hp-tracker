import gql from 'graphql-tag';
import React from 'react';
import ListRow from './ListRow';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet( {
  addMonsterButton: {
    backgroundColor: 'green',
    opacity: '1',
  },
  text: {
    margin: 'auto',
    textAlign: 'center',
    verticalAlign: 'middle',
  }
})

function AddMonsterButton() {
  return (
    <ListRow addedStyles={[styles.addMonsterButton]}>
      <div {...css(styles.text)}>
        Add Monster
      </div>
    </ListRow>);
}

export default AddMonsterButton;