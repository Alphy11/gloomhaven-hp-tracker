import gql from 'graphql-tag';
import React from 'react';
import ListView from './ListView';
import ListSection from './ListSection';
import MonsterGroupList from './MonsterGroupList';
import AddMonsterButton from './AddMonsterButton';
import AllMonsterGroupsContainer from '../Containers/AllMonsterGroupsContainer';


function MonsterListView({ monsterGroups }) {
  return (
    <ListView>
      {
        monsterGroups.map(
          group =>
            <MonsterGroupList id={group.id} type={group.type} key={group.id}/>)}
      <AddMonsterButton />
    </ListView>);
}

const fragments = {
  monsterListView: gql`
    fragment monsterListView on MonsterGroup {
      id,
      type
    }`,
};

export default AllMonsterGroupsContainer(MonsterListView, fragments.monsterListView, 'monsterListView');