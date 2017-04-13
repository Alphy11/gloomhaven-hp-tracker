import React from 'react';
import gql from 'graphql-tag';
import ListItem from './ListItem';
import ListSection from './ListSection';
import MonsterStatusEffects from '../MonsterTracker/Monster/MonsterStatusEffects';
import VCenter from 'Util/VCenter';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  centered: {
    textAlign: 'center',
  },
  number: {
    fontSize: '48px',
    margin: 'auto'
  },
  plus: {
    backgroundColor: 'green',
    height: '100%',
  },
  minus: {
    backgroundColor: 'red',
    height: '100%',
  }
});

function MonsterListRow({ monster }) {
  const {
    number,
    hp,
    maxHp,
    statusEffects,
  } = monster;

  return (
    <ListItem>
      <ListSection sections={2}>
        <VCenter>
          <div {...css(styles.number)}>
            {number}
          </div>
        </VCenter>
      </ListSection>
      <ListSection sections={4}>
        <VCenter>
          <div {...css(styles.number)}>
            {hp} / {maxHp}
          </div>
        </VCenter>
      </ListSection>
      <ListSection sections={2}>
        <MonsterStatusEffects monster={monster} />
      </ListSection>
      <ListSection sections={2}>
        <div {...css(styles.plus)} >
          <VCenter>
            <div {...css(styles.number)}>
              +
            </div>
          </VCenter>
        </div>
      </ListSection>
      <ListSection sections={2}>
         <div {...css(styles.minus)} >
          <VCenter>
            <div {...css(styles.number)}>
              -
            </div>
          </VCenter>
        </div>
      </ListSection>
    </ListItem>);
}

MonsterListRow.fragments = {
  monsterInfoMobile: gql`
    fragment monsterInfoMobile on Monster {
      id,
      number,
      hp,
      maxHp,
      ...monsterStatusEffects
    }
    ${MonsterStatusEffects.fragments.monsterStatusEffects}`,
}

export default MonsterListRow;