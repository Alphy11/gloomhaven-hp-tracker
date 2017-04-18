import React from 'react';
import gql from 'graphql-tag';
import { css, createStyleSheet } from 'Util/css';
import VCenter from 'Util/VCenter';
import ListSection from './ListSection';

import createMonsterHpContainer from 'Containers/createMonsterHpContainer';

const styles = createStyleSheet({
  number: {
    fontSize: '48px',
    margin: 'auto',
  },
  plus: {
    backgroundColor: 'green',
    height: '100%',
  },
  minus: {
    backgroundColor: 'red',
    height: '100%',
  },
});

function MonsterHp({ monster, getHp, setHp }) {
  return (
    <ListSection sections={4}>
      <ListSection sections={6}>
        <div {...css(styles.plus)} onClick={() => setHp(1)} >
          <VCenter>
            <div {...css(styles.number)}>
              +
            </div>
          </VCenter>
        </div>
      </ListSection>
      <ListSection sections={6}>
        <div {...css(styles.minus)} onClick={() => setHp(-1)} >
          <VCenter>
            <div {...css(styles.number)}>
              -
            </div>
          </VCenter>
        </div>
      </ListSection>
    </ListSection>);
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
