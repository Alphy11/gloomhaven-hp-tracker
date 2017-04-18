import React from 'react';
import gql from 'graphql-tag';
import ListItem from './ListItem';
import ListSection from './ListSection';
import MonsterStatusEffects from '../../Shared/MonsterStatusEffects';
import VCenter from 'Util/VCenter';
import { css, createStyleSheet } from 'Util/css';

import MonsterHp from './MonsterHp';

const styles = createStyleSheet({
  centered: {
    textAlign: 'center',
  },
  number: {
    fontSize: '48px',
    margin: 'auto',
  },
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
      <MonsterHp monster={monster} />
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
};

export default MonsterListRow;
