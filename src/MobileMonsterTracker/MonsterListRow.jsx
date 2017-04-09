import React from 'react';
import gql from 'graphql-tag';
import ListRow from './ListRow';
import ListSection from './ListSection';
import MonsterGroupContainer from '../Containers/MonsterGroupContainer'

function MonsterListRow({ monster }) {
  const {
    number,
    hp
  } = monster;

  return (
    <div>
      <ListSection>{number}</ListSection>
    </div>);
}

MonsterListRow.fragments = {
  monsterInfoMobile: gql`
    fragment monsterInfoMobile on Monster {
      id,
      number,
      hp
    }`,
}

export default MonsterListRow;