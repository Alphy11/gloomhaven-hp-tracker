import React from 'react';
import gql from 'graphql-tag';
import createContainer, { Query } from './createContainer';

function AllMonstersContainer(WrappedComponent) {
  const MONSTER_QUERY = new Query(gql`
    query monsters {
      allMonsters {
          id
          number
      }
    }`,
    'allMonsters');

  const MONSTER_SUBSCRIPTION = new Query(gql`
    subscription {
      Monster(
        filter: {
          mutation_in: [CREATED, UPDATED, DELETED]
          }
      ) {
        node {
          id,
          number
        },
        mutation,
        previousValues {
          id
        }
      }
    }`,
    'Monster');


  function optionsFunction(params) {
    return {
      id: params.id,
    };
  }

  const dataPropName = 'monsters';

  const withData = createContainer(
    MONSTER_QUERY,
    MONSTER_SUBSCRIPTION,
    optionsFunction,
    dataPropName,
  );


  class AllMonstersContainerHOC extends React.Component {
    static get fragments() {
      return WrappedComponent.fragments;
    }

    static get displayName() {
      return `AllMonstersContainerHOC(${WrappedComponent.name})`;
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

  return withData(AllMonstersContainerHOC);
}

export default AllMonstersContainer;
