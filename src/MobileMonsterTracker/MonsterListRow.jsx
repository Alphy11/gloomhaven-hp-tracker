import React from 'react';
import gql from 'graphql-tag';
import ListItem from './ListItem';
import ListSection from './ListSection';
import MonsterGroupContainer from '../Containers/MonsterGroupContainer'

function MonsterListRow({ monster }) {
  const {
    number,
    hp
  } = monster;

  return (
    <ListItem>
      <ListSection>{number}</ListSection>
    </ListItem>);
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