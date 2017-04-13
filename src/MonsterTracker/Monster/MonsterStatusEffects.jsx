import React from 'react';
import gql from 'graphql-tag';

import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  top: {
    width: '100%',
    height: '15px',
    display: 'inline-block',
    paddingTop:'5px',
  },
  circle: {
     width: '25px',
     height: '25px',
     margin: 'auto',
     borderRadius: '50%',
     backgroundColor: 'blue',
     float: 'left',
  },
  Stunned: {
    backgroundColor: '#0000FF',
  },
  Immobilized: {
    backgroundColor: '#800000',
  },
  Disarmed: {
    backgroundColor: '#B0C4DE',
  },
  Muddled: {
    backgroundColor: '#8B4513',
  },
  Strengthened: {
    backgroundColor: '#00CED1',
  },
  Poisoned: {
    backgroundColor: '#006400',
  }
});

function MonsterStatusEffects({ monster }) {
  let { statusEffects } = monster;
  const effects = statusEffects || ["Strengthened"];
  return (
    <div {...css(styles.top)}>
      { effects.map( effect =>
          <div {...css(styles.circle, styles[effect])} key={effect}/>) }
    </div>);
}

MonsterStatusEffects.fragments = {
  monsterStatusEffects: gql`
    fragment monsterStatusEffects on Monster {
      statusEffects
    }
  `
}

export default MonsterStatusEffects;