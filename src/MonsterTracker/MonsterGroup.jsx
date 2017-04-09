import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import subscriptionSetup, { subscribeToData } from 'Util/graphql/subscribe';
import { css, createStyleSheet } from 'Util/css';
import { getAndSubscribeToAllInGroup } from 'Util/graphql/createGraphCoolQueries';
import Section from 'Util/Section';
import {
  findValueIndex,
  addValue,
  updateValue,
  removeValue
} from 'Util/list';

import Monster from './Monster';

const styles = createStyleSheet({
  top: {
    display:'inline-block',
    width: '50%',
  },
});

class MonsterGroup extends React.Component {
  componentWillMount() {
    this.props.subscribeToMonsters({
            id: this.props.id,
        });
  }
  render(){
    const { monsterGroupType, monsters } = this.props;
    const { allMonsters: monsterList } = monsters;
    if(!monsterList) {
      return null;
    }
    return (
      <div {...css(styles.top)}>
        <h2>{monsterGroupType}</h2>
        {monsterList.slice()
          .sort( (m1, m2) => m1.number > m2.number)
          .map(
            (monster) =>
              <Section key={monster.id}>
                <Monster monster={monster} />
              </Section>)}
      </div>);
  }
}

const MONSTER_QUERY = gql`
  query monsters($id: ID!) {
    allMonsters: allMonsters(
      filter: {
        monsterGroup: {
          id: $id
        }
      }) {
        id
        ...monsterInfo
    }
  }
  ${Monster.fragments.monsterInfo}`;

MonsterGroup.fragments = {
  monsterInfoWithId: gql`
    fragment monsterInfoWithId on Monster {
      id,
      ...monsterInfo
    }
    ${Monster.fragments.monsterInfo}`,
}

const MONSTER_SUBSCRIPTION = gql`
subscription ($id: ID!) {
  Monster(
    filter: {
      mutation_in: [CREATED, UPDATED, DELETED],
			node: {
        monsterGroup: {
          id: $id
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


function optionsFunction(params){
  return {
      id: params.id,
  }
}

const withData = graphql(MONSTER_QUERY, {
    name: 'monsters',
    options: optionsFunction,
    props: props => {
      return {
        monsters: props.monsters,
        subscribeToMonsters: params => {
          return props.monsters.subscribeToMore({
            document: MONSTER_SUBSCRIPTION,
            variables: optionsFunction(props.ownProps),
            updateQuery: (prev, {subscriptionData}) => {
              if (!subscriptionData.data) {
                return prev;
              }
              const prevEntries = prev.allMonsters;
              const newMonster = subscriptionData.data.Monster;
              const { mutation, previousValues, node } = newMonster;
              let retList;
              switch (mutation) {
              case "CREATED":
                retList = addValue(prevEntries, node);
                break;
              case "UPDATED":
                retList = updateValue(prevEntries, node);
                break;
              case "DELETED":
                retList = removeValue(prevEntries, node);
                break;
              default:
                retList = prevEntries;
              }

              return {
                ...prev,
                allMonsters: retList,
              }
            }
          });
        }
      }
    }
});




const MonsterGroupWithData = withData(MonsterGroup);


//const MonsterGroupWithData = subscribeToData("Monster", "monsterGroup")(MonsterGroup); //MonsterGroup;

export default MonsterGroupWithData;