import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
  }`

export default function createAddMonsterContainer(WrappedComponent) {
  class AddMonsterContainerHOC extends React.Component {
    static get fragments(){
      return WrappedComponent.fragments
    }

    static get displayName() {
      return `AddMonsterContainerHOC(${WrappedComponent.name})`
    }

    constructor(props, context) {
      super(props, context);

      this.state = {};

      this.createInputProps = this.createInputProps.bind(this);
      this.submit = this.submit.bind(this);
      this.close = this.close.bind(this);
      this.shift = 1;
    }

    createInputProps(name, isNumber) {
      return {
        onChange: (value) => this.trackValue(name, value),
        number: isNumber,
        value: this.getValue(name),
      }
    }

    trackValue(name, value) {
      this.setState({
        ...this.state,
        [name]: value,
      })
    }

    getValue(name) {
      return this.state[name] || "";
    }

    submit(){
      let { hp, types, normals, elites } = this.state;
      const monsterNumbers = this.props.group.monsters.map(m => m.number);
      const availableNumbers =
        Array(normals + elites + monsterNumbers.length).fill()
          .map((_, idx) => idx).filter(v => !monsterNumbers.includes(v));
      this.shift = 1;
      Array(normals + elites).fill().forEach(
        (val, index) =>
          this.props.createMonster({
            hp: hp * 1,
            maxHp: hp * 1,
            number: availableNumbers[index],
            monsterGroupId: this.props.group.id,
            elite: index > normals - 1,
          })
      );

      this.close();
    }

    close() {
      this.props.toggle(false);
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

  return graphql(
    createMonster,
    {
      props: ({ ownProps, mutate }) => ({
        createMonster({ elite, hp, number, monsterGroupId }) {
          return mutate({
            variables: { elite, hp, number, monsterGroupId },
          });
        },
      }),
    },
  )(AddMonsterContainerHOC);
}