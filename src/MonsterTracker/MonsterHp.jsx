import React from 'react';
import { css, createStyleSheet } from '../Util/css';
import gql from 'graphql-tag';
import Section from '../Util/Section';
import { graphql } from 'react-apollo'

const styles = createStyleSheet({
  children: {
    float: 'left',
    padding: '5px 5px 5px 5px',
  },
  top: {
    width: '100%',
    display: 'inline-block',
  },
  modifiersButton: {
    margin: 'auto',
    width: '50%'
  }
});

const modifiers = ["+5", "+1", "-1", "-5"];

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
      <div {...css(styles.top)}>
        <Section totalSections={1}>
          <h3>
            <Section>HP: </Section><Section>{`${this.getHp()}/${maxHp}`}</Section>
          </h3>
        </Section>
        <Section totalSections={1}>
          {modifiers.map(mod => (
            <Section totalSections={modifiers.length} key={mod}>
              <button onClick={this.getOnClick(mod)}{...css(styles.modifiersButton)}>{mod}</button>
            </Section>
          ))}
        </Section>
      </div>);
  }
}

// client.mutate({
//   mutation: ...,            // same as above
//   variables: ...,           // same as above
//   updateQueries: ...,       // same as above
//   optimisticResponse: {
//     id: generatedId,
//     text: text,             // this is one of the arguments
//     createdAt: +(new Date), // not accurate, but close
//     completed: false,       // assume task is created not completed
//   },
// });

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