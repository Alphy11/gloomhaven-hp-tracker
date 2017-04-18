import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Row from 'Util/Row';
import Section from 'Util/Section';
import { css, createStyleSheet } from 'Util/css';

import createMonsterHpContainer from 'Containers/createMonsterHpContainer';

const styles = createStyleSheet({
  children: {
    float: 'left',
    padding: '5px 5px 5px 5px',
  },
  modifiersButton: {
    margin: 'auto',
    width: '100%',
  },
});

const modifiers = ['+1', '-1', '+5', '-5'];

class MonsterHp extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getOnClick(label) {
    return () => this.props.setHp(label);
  }

  render() {
    const { monster, getHp } = this.props;
    const { maxHp } = monster;
    return (
      <Row>
        <Section>
          <h3>HP:                      {`${getHp()}/${maxHp}`}</h3>
        </Section>
        <Section>
          {modifiers.map(mod => (
            <Section totalSections={modifiers.length / 2} key={mod}>
              <button onClick={this.getOnClick(mod)}{...css(styles.modifiersButton)}>{mod}</button>
            </Section>
          ))}
        </Section>
      </Row>);
  }
}

MonsterHp.fragments = {
  monsterHpInfo: gql`
    fragment monsterHpInfo on Monster {
      hp,
      maxHp
    }
  `,
};

export default createMonsterHpContainer(MonsterHp);
