import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createMonster = gql`
  mutation updateMonster($id: ID!, $hp: Int!) {
    updateMonster(id: $id, hp: $hp) {
      id,
      hp
    }
  }
`

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
      this.props.changeHp({
          id: this.props.monster.id,
        },
        this.getHp() + (label * 1));
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

  return graphql(
    createMonster,
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
}