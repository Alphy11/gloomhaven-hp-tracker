import React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import AllMonsterGroupsContainer from 'Containers/allMonsterGroupsContainer';

import MonsterGroup from './MonsterGroup';

function MonsterTracker({ monsterGroups }) {
  return (
    <div>
      {monsterGroups.map(
        ({ type, id }) =>
          <MonsterGroup
            id={id}
            monsterGroupType={type}
            key={id}
          />,
      )}
      <Link to={'/nonmobile/add'}>Add Monster</Link>
    </div>
  );
}

const fragments = {
  monsterGroup: gql`
    fragment monsterGroupInfo on MonsterGroup {
      id,
      type
    }`,
};
const MonsterTrackerWithSubscription = AllMonsterGroupsContainer(MonsterTracker, fragments.monsterGroup, 'monsterGroupInfo');

export default withRouter(MonsterTrackerWithSubscription);
