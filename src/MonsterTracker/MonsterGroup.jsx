import React from 'react';
import Monster from './Monster.jsx';
import { css, createStyleSheet } from '../Util/css';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import subscriptionSetup from './subscriptionSetup';

const styles = createStyleSheet({
  top: {
    display:'inline-block',
    width: '50%',
  },
});

const propName = "allMonsters";
// TODO: CHANGE QUERY SO WE GET UPDATED MONSTERS, WE SHOULD NOT BE QUERYING THE GROUP ITSELF, THAT SHOULD BE PASSED IN
class MonsterGroup extends React.Component {
  componentWillReceiveProps(newProps) {
    const id = this.props.monsterGroup.id;
    if(!id) {
      return;
    }

    const query = gql`
      subscription {
        Monster(
          filter: {
            mutation_in: [CREATED, UPDATED, DELETED],
            node: {
              monsterGroup: {
                id: "${id}"
              }
            }
          }
        ) {
          node {
            id,
            ...monsterInfo
          },
          mutation,
          previousValues {
            id
          }
        }
      }
      ${Monster.fragments.monsterInfo}`;
    subscriptionSetup(this, propName, newProps, query, "Monster");
  }

  render() {
    const {
      data,
      monsterGroup
    } = this.props;
    const {
      [propName]: monsters
    } = data;

    if(!monsters) {
      return null;
    }

    return (
    <div {...css(styles.top)}>
      <h2>{monsterGroup.type}</h2>
      {monsters.slice()
        .sort( (m1, m2) => m1.number > m2.number)
        .map(
          (monster) =>
            <Monster
              monster={monster}
              key={monster.id}
            />
      )}
    </div>);
  }
}

const MonstersQuery = gql`
  query monsters($id: ID){
    ${propName}(
      filter: {
        monsterGroup: {
          id: $id
        }
    }) {
      id,
      ...monsterInfo
    }
  }
  ${Monster.fragments.monsterInfo}`

const MonsterGroupWithData = graphql(MonstersQuery, {
  options: ({ monsterGroup }) =>
    ({
      variables: {
        id: monsterGroup.id
      }
    }),
})(MonsterGroup)

export default MonsterGroupWithData;