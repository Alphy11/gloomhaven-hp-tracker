import React from 'react';
import { css, createStyleSheet } from '../Util/css';
import gql from 'graphql-tag';

const styles = createStyleSheet({
  top: {
    width: '100%',
    height: '15px',
    display: 'inline-block',
  },
  circle: {
     width: '10px',
     height: '10px',
     margin: 'auto',
     borderRadius: '50%',
     backgroundColor: 'blue',
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



class MonsterStatusEffects extends React.Component {
  render() {
    const { monster } = this.props;
    let { effects } = monster;
    effects = effects || ["Strengthened"];
    return (
      <div {...css(styles.top)}>
        {effects.map( effect => {
            const cssRes = {...css(styles.circle, styles[effect])};
            return <div {...cssRes} key={effect}/>
          })
        }
      </div>);
  }
}

MonsterStatusEffects.fragments = {
  monsterStatusEffects: gql`
    fragment monsterStatusEffects on Monster {
      statusEffects
    }
  `
}

export default MonsterStatusEffects;