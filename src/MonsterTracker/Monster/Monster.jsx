import React from 'react';
import gql from 'graphql-tag';

import Row from 'Util/Row';
import Section from 'Util/Section';
import { css, createStyleSheet } from 'Util/css';

import MonsterHp from './MonsterHp';
import MonsterStatusEffects from './MonsterStatusEffects'

const styles = createStyleSheet({
  monsterLabel: {
    float: 'left',
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
  },
  top: {
    width: '100%',
    display: 'inline-block',
    float: 'left',
    border: '2px solid',
    boxSizing: 'border-box',
    //padding: '10px 10px 10px 10px',
  },
  borderColor:{
    borderColor: 'black',
  },
  borderColor_elite:{
    borderColor: 'gold',
  }
});

function Monster({ monster }) {
  const { elite, number } = monster;

  return (
    <div
      {...css(
        styles.top,
        elite && styles.borderColor_elite,
        !elite && styles.borderColor)}
    >
      <Row>
        <MonsterStatusEffects monster={monster} />
      </Row>
      <Row>
        <Row>
          <h3 {...css(styles.monsterLabel)}>{number}</h3>
        </Row>
        <Row>
          <MonsterHp monster={monster} />
        </Row>
      </Row>
    </div>);
}

Monster.fragments = {
  monsterInfo: gql`
    fragment monsterInfo on Monster {
      number,
      elite,
      ...monsterHpInfo
    }
    ${MonsterHp.fragments.monsterHpInfo}
  `
}

export default  Monster