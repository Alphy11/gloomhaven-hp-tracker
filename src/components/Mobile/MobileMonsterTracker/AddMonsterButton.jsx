import React from 'react';

import VCenter from 'Util/VCenter';
import { css, createStyleSheet } from 'Util/css';

import ListRow from './ListRow';

const styles = createStyleSheet({
  addMonsterButton: {
    backgroundColor: 'green',
    opacity: '1',
  },
  text: {
    fontSize: '64px',
  },
  button: {
    width: '100%',
    height: '100%',
  },
});

function AddMonsterButton({ toggle }) {
  return (
    <ListRow addedStyles={[styles.addMonsterButton]}>
      <div {...css(styles.button)} onClick={() => toggle(true)}>
        <div {...css(styles.text)}>
          <VCenter>Add Monster</VCenter>
        </div>
      </div>
    </ListRow>);
}

export default AddMonsterButton;
