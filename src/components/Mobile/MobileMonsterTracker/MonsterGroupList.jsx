import React from 'react';
import gql from 'graphql-tag';
import MonsterGroupContainer from 'Containers/MonsterGroupContainer';
import { camelToSpaces } from 'Util/helpers';
import MonsterListRow from './MonsterListRow';
import ListHeader from './ListHeader';

function MonsterGroupList({ monsters, type }) {
  return (
    <div>
      <ListHeader>{camelToSpaces(type)}</ListHeader>
      {!!monsters.length &&
        monsters.map(monster => <MonsterListRow key={monster.id} monster={monster} />)}
    </div>);
}

const fragments = {
  monsterInfoWithIdMobile: gql`
    fragment monsterInfoWithIdMobile on Monster {
      id,
      ...monsterInfoMobile
    }
    ${MonsterListRow.fragments.monsterInfoMobile}`,
};

export default MonsterGroupContainer(MonsterGroupList, fragments.monsterInfoWithIdMobile, 'monsterInfoWithIdMobile');
