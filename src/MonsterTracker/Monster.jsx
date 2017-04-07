import React from 'react';
import gql from 'graphql-tag'
import { css, createStyleSheet } from '../Util/css';
import MonsterHp from './MonsterHp';
import Section from '../Util/Section';
import MonsterStatusEffects from './MonsterStatusEffects'

const styles = createStyleSheet({
  monsterLabel: {
    float: 'left',
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
  },
  top: {
    width: '50%',
    display: 'inline-block',
    float: 'left',
    border: '2px solid',
  },
  borderColor:{
    borderColor: 'black',
  },
  borderColor_elite:{
    borderColor: 'gold',
  }
});

class Monster extends React.Component {
  render() {
    const { monster } = this.props;

    const { elite, number } = monster;

    return (
      <div
        {...css(
          styles.top,
          elite && styles.borderColor_elite,
          !elite && styles.borderColor)}
      >
        <Section totalSections={1}>
            <MonsterStatusEffects monster={monster} />
        </Section>
        <Section totalSections={1}>
            <Section totalSections={1}>
              <h3 {...css(styles.monsterLabel)}>{number}</h3>
            </Section>
            <Section totalSections={1}>
              <MonsterHp monster={monster} />
            </Section>
        </Section>
      </div>);
  }
}

Monster.fragments = {
  monsterInfo: gql`
    fragment monsterInfo on Monster {
      number,
      elite,
      ...monsterHpInfo
    }
    ${MonsterHp.fragments.monsterHpInfo}
  `
}

export default  Monster