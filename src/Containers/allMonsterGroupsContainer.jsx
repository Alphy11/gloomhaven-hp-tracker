import React from 'react';
import gql from 'graphql-tag';
import createContainer, { Query } from './createContainer';

function AllMonsterGroupsContainer(WrappedComponent, fragment, fragmentName) {
  const MONSTER_QUERY = new Query(gql`
  query {
    allMonsterGroups: allMonsterGroups {
      ...${fragmentName}
    }
  }
  ${fragment}`,
  'allMonsterGroups');

  const MONSTER_SUBSCRIPTION = new Query(gql`
      subscription {
        MonsterGroup(filter: {mutation_in: [CREATED, UPDATED, DELETED]}) {
          node {
            ...${fragmentName}
          },
          mutation,
          previousValues {
            id
          }
        }
      }
      ${fragment}`,
    'MonsterGroup');


  function optionsFunction() {
    return {};
  }

  const dataPropName = 'monsterGroups';

  const withData = createContainer(
    MONSTER_QUERY,
    MONSTER_SUBSCRIPTION,
    optionsFunction,
    dataPropName,
  );


  class AllMonsterGroupsContainerHOC extends React.Component {
    static get fragments() {
      return WrappedComponent.fragments;
    }

    static get displayName() {
      return `AllMonsterGroupsContainerHOC(${WrappedComponent.name})`;
    }

    componentWillMount() {
      this.props.subscribeToData();
    }

    render() {
      const dataProp = this.props[dataPropName];
      if (dataProp.loading) {
        return null;
      }

      return (
        <WrappedComponent
          {...this.props}
          monsterGroups={dataProp.allMonsterGroups}
        />);
    }
  }

  return withData(AllMonsterGroupsContainerHOC);
}

export default AllMonsterGroupsContainer;
