import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import subscriptionSetup, { subscribeToData } from 'Util/graphql/subscribe';
import { css, createStyleSheet } from 'Util/css';
import { getAndSubscribeToAllInGroup } from 'Util/graphql/createGraphCoolQueries';
import subscribeTo from 'Util/subscribeTo';
import Section from 'Util/Section';

import Monster from './Monster';

const styles = createStyleSheet({
  top: {
    display:'inline-block',
    width: '50%',
  },
});

function MonsterGroup({ data, monsterGroupType, monsters }) {
    return (
    <div {...css(styles.top)}>
      <h2>{monsterGroupType}</h2>
      {monsters.slice()
        .sort( (m1, m2) => m1.number > m2.number)
        .map(
          (monster) =>
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
}

MonsterGroup.propsToOptions = ({ id }) =>
  ({
    variables: {
      id: id
    }
  });

//const MonsterGroupWithSubscription = ;

export default subscribeTo("Monster", "monsterGroup")(MonsterGroup); //MonsterGroup;