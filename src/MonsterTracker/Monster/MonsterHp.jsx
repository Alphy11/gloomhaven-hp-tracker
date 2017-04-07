import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

import Row from 'Util/Row';
import Section from 'Util/Section';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  children: {
    float: 'left',
    padding: '5px 5px 5px 5px',
  },
  modifiersButton: {
    margin: 'auto',
    width: '100%'
  }
});

const modifiers = ["+1", "-1", "+5", "-5"];

class MonsterHp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.mutation = this.mutation.bind(this);
  }

  // PROBABLY NEED TO MOVE TO YOUR OWN REDUX STORE to speed this up.

  getHp() {
    return this.props.monster.hp;
  }

  mutation(label) {
    this.props.mutate({
        id: this.props.monster.id,
        hp: this.getHp() + (label *1),
      });
  }

  getOnClick(label) {
    return () => this.mutation(label);
  }

  render() {
    const { monster } = this.props;
    const { maxHp } = monster;
    return (
      <Row>
        <Section>
          <h3>HP:  {`${this.getHp()}/${maxHp}`}</h3>
        </Section>
        <Section>
          {modifiers.map(mod => (
            <Section totalSections={modifiers.length/2} key={mod}>
              <button onClick={this.getOnClick(mod)}{...css(styles.modifiersButton)}>{mod}</button>
            </Section>
          ))}
        </Section>
      </Row>);
  }
}

const monsterHpChange = gql`
  mutation updateMonster($id: ID!, $hp: Int!) {
    updateMonster(id: $id, hp: $hp) {
      id,
      hp
    }
  }
`

MonsterHp.fragments = {
  monsterHpInfo: gql`
    fragment monsterHpInfo on Monster {
      hp,
      maxHp
    }
  `
}

const MonsterHpWithMutation = graphql(
  monsterHpChange,
  {
    props: ({ ownProps, mutate }) => ({
      mutate({ id, hp }) {
        return mutate({
          variables: { id, hp },
          optimisticResponse: {
            __typename: 'Mutation',
            allMonsters: {
              id,
              __typename: 'Monster',
              hp,
            },
          },
        });
      },
    }),
  },
)(MonsterHp);

export default MonsterHpWithMutation;