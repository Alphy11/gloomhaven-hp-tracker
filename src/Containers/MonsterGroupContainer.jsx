import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import createContainer, { Query } from './createContainer';

import { subscribeToData } from 'Util/subscribe';
import {
  findValueIndex,
  addValue,
  updateValue,
  removeValue,
} from 'Util/list';

function MonsterGroupContainer(WrappedComponent, fragment, fragmentName) {
  const MONSTER_QUERY = new Query(gql`
    query monsters($id: ID!) {
      allMonsters: allMonsters(
        filter: {
          monsterGroup: {
            id: $id
          }
        }) {
          id
          ...${fragmentName}
      }
    }
    ${fragment}`,
    'allMonsters');

  const MONSTER_SUBSCRIPTION = new Query(gql`
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
          ...${fragmentName}
        },
        mutation,
        previousValues {
          id
        }
      }
    }
    ${fragment}`,
    'Monster');


  function optionsFunction(params) {
    return {
      id: params.id,
    };
  }

  const dataPropName = 'monsters';

  const withData = createContainer(MONSTER_QUERY, MONSTER_SUBSCRIPTION, optionsFunction, dataPropName);


  class MonsterGroupContainerHOC extends React.Component {
    static get fragments() {
      return WrappedComponent.fragments;
    }

    static get displayName() {
      return `MonsterGroupContainerHOC(${WrappedComponent.name})`;
    }

    componentWillMount() {
      this.props.subscribeToData({
        id: this.props.id,
      });
    }

    render() {
      const monsterDataProp = this.props[dataPropName];
      if (monsterDataProp.loading) {
        return null;
      }

      return (
        <WrappedComponent
          {...this.props}
          monsters={monsterDataProp.allMonsters}
        />);
    }
  }

  return withData(MonsterGroupContainerHOC);
}

export default MonsterGroupContainer;
