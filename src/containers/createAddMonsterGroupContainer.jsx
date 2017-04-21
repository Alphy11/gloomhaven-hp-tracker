import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createMonsterGroup = gql`
  mutation createGroup (
    $type: MONSTER_GROUP_TYPE,
    $monsters: [MonsterGroupmonstersMonster!]
  ) {
    createMonsterGroup(
      type: $type,
      monsters: $monsters
    ){
      id,
      type,
      monsters{
        id,
        number
      }
    }
  }`;

export default function createAddMonsterContainer(WrappedComponent) {
  class AddMonsterContainerHOC extends React.Component {
    static get fragments() {
      return WrappedComponent.fragments;
    }

    static get displayName() {
      return `AddMonsterContainerHOC(${WrappedComponent.name})`;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
        />);
    }
  }

  return graphql(
    createMonsterGroup,
    {
      props: ({ mutate }) => ({
        createMonsterGroup(type, monsters) {
          return mutate({
            variables: { type, monsters },
          });
        },
      }),
    },
  )(AddMonsterContainerHOC);
}
