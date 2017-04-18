import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { subscribeToData } from 'Util/subscribe';
import { css, createStyleSheet } from 'Util/css';
import Section from 'Util/Section';
import {
  findValueIndex,
  addValue,
  updateValue,
  removeValue,
} from 'Util/list';

import Monster from './Monster';
import MonsterGroupContainer from 'Containers/MonsterGroupContainer';

const styles = createStyleSheet({
  top: {
    display: 'inline-block',
    width: '50%',
  },
});

class MonsterGroup extends React.Component {
  render() {
    const {
      monsterGroupType,
      monsters: monsterList,
    } = this.props;

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
