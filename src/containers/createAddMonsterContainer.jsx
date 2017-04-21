import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import MonsterNames from 'Data/monsterNames';
import createAddMonsterGroupContainer from './createAddMonsterGroupContainer';

const createMonster = gql`
  mutation addMonster(
    $elite: Boolean
    $hp: Int!
    $number: Int!
    $monsterGroupId: ID
  ) {
    createMonster(
      hp: $hp,
      maxHp: $hp,
      number: $number,
      monsterGroupId: $monsterGroupId,
      elite: $elite
    ) {
      id,
      hp,
      maxHp,
      number,
      monsterGroup {
        id
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

    constructor(props, context) {
      super(props, context);

      this.state = {};

      this.createInputProps = this.createInputProps.bind(this);
      this.submit = this.submit.bind(this);
    }

    getValue(name) {
      return this.state[name] || '';
    }

    trackValue(name, value) {
      this.setState({
        ...this.state,
        [name]: value,
      });
    }

    createInputProps(name, isNumber) {
      return {
        onChange: value => this.trackValue(name, value),
        number: isNumber,
        value: this.getValue(name),
        name,
      };
    }

    submit(event) {
      const { hp, normals, elites, type } = this.state;
      if (!MonsterNames.includes(type)) {
        event.preventDefault();
        return false;
      }
      const monsterNumbers = this.props.monsters.map(m => m.number);
      const availableNumbers =
        Array(normals + elites + monsterNumbers.length).fill()
          .map((_, idx) => idx).filter(v => !monsterNumbers.includes(v));

      const group = this.props.monsterGroups.find(group => group.type === type);

      const monsters = Array(normals + elites).fill().map(
        (val, index) => (
          group
          ? ({
            hp: hp * 1,
            maxHp: hp * 1,
            number: availableNumbers[index],
            monsterGroupId: group.id,
            elite: index > normals - 1 })
          : ({
            hp: hp * 1,
            maxHp: hp * 1,
            number: availableNumbers[index],
            elite: index > normals - 1 })),
      );

      if (group) {
        monsters.forEach((monster) => {
          this.props.createMonster(monster);
        });
      } else {
        this.props.createMonsterGroup(type, monsters);
      }

      return true;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          createInputProps={this.createInputProps}
          submit={this.submit}
          close={this.close}
        />);
    }
  }

  return createAddMonsterGroupContainer(graphql(
    createMonster,
    {
      props: ({ mutate }) => ({
        createMonster({ elite, hp, number, monsterGroupId }) {
          return mutate({
            variables: { elite, hp, number, monsterGroupId },
          });
        },
      }),
    },
  )(AddMonsterContainerHOC));
}
