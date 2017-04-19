import React from 'react';
import gql from 'graphql-tag';

import MonsterGroupContainer from 'Containers/MonsterGroupContainer';
import { css, createStyleSheet } from 'Util/css';
import Section from 'Util/Section';

import Monster from './Monster';

const styles = createStyleSheet({
  top: {
    display: 'inline-block',
    width: '50%',
  },
});

function MonsterGroup(props) {
  const {
    monsterGroupType,
    monsters: monsterList,
  } = props;

  return (
    <div {...css(styles.top)}>
      <h2>{monsterGroupType}</h2>
      {monsterList.slice()
        .sort((m1, m2) => m1.number > m2.number)
        .map(
          monster =>
            <Section key={monster.id}>
              <Monster monster={monster} />
            </Section>)}
    </div>);
}

MonsterGroup.fragments = {
  monsterInfoWithId: gql`
    fragment monsterInfoWithId on Monster {
      id,
      ...monsterInfo
    }
    ${Monster.fragments.monsterInfo}`,
};

export default MonsterGroupContainer(MonsterGroup, MonsterGroup.fragments.monsterInfoWithId, 'monsterInfoWithId');
