import React from 'react';
import gql from 'graphql-tag';
import ListRow from './ListRow';
import MonsterListRow from './MonsterListRow';
import ListHeader from './ListHeader';
import MonsterGroupContainer from '../Containers/MonsterGroupContainer'

function MonsterGroupList({ monsters, type }) {

  return (
    <div>
      <ListHeader>TYPE: {type}</ListHeader>
      {!!monsters.length && monsters.map(monster => <MonsterListRow key={monster.id} monster={monster} />)}
    </div>);
}

const fragments = {
  monsterInfoWithIdMobile: gql`
    fragment monsterInfoWithIdMobile on Monster {
      id,
      ...monsterInfoMobile
    }
    ${MonsterListRow.fragments.monsterInfoMobile}`,
}

export default MonsterGroupContainer(MonsterGroupList, fragments.monsterInfoWithIdMobile, 'monsterInfoWithIdMobile');