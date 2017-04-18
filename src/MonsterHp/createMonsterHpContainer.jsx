import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const updateMonsterHp = gql`
  mutation updateMonster($id: ID!, $hp: Int!) {
    updateMonster(id: $id, hp: $hp) {
      id,
      hp
    }
  }`;

const deleteMonster = gql`
  mutation deleteMonster($id: ID!) {
    deleteMonster(id: $id) {
      id
    }
  }`;


export default function createMonsterHpContainer(WrappedComponent) {
  class MonsterHpContainerHOC extends React.Component {
    static get fragments(){
      return WrappedComponent.fragments
    }

    static get displayName() {
      return `MonsterHpContainerHOC(${WrappedComponent.name})`
    }

    constructor(props, context) {
      super(props, context);
      this.getHp = this.getHp.bind(this);
      this.setHp = this.setHp.bind(this);
    }

    getHp() {
      return this.props.monster.hp;
    }

    setHp(label) {
      this.changeXpTo(this.getHp() + (label * 1));
    }

    changeXpTo(newHp) {
      if(newHp > 0) {
        this.props.changeHp(
          {
            id: this.props.monster.id,
          },
          newHp);
      } else {
        this.props.deleteMonster(this.props.monster.id);
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getHp={this.getHp}
          setHp={this.setHp}
        />);
    }
  }

  // Need to move to our own redux store cache because optimistic response is too slow.
  const MonsterHpContainerHOCWithChangeHp = graphql(
    updateMonsterHp,
    {
      props: ({ ownProps, mutate }) => ({
        changeHp({ id }, hp) {
          return mutate({
            variables: { id, hp },
          });
        },
      }),
    },
  )(MonsterHpContainerHOC);

  return graphql(
    deleteMonster,
    {
      props: ({ ownProps, mutate }) => ({
        deleteMonster( id ) {
          return mutate({
            variables: { id },
          });
        },
      }),
    },
  )(MonsterHpContainerHOCWithChangeHp);
}