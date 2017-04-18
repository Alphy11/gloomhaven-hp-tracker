import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import MonsterGroup from './MonsterGroup';
import AllMonsterGroupsContainer from '../Containers/AllMonsterGroupsContainer';

class MonsterTracker extends React.Component {

  render() {
    const monsterGroups = this.props.monsterGroups;
    return (
      <div>
        {monsterGroups.map(
          ({ type, monsters, id }) =>
            <MonsterGroup
              id={id}
              monsterGroupType={type}
              key={id} />
        )}
        <Link to={'/nonmobile/add'}>Add Monster</Link>
      </div>
    );
  }
}

const fragments = {
  monsterGroup: gql`
    fragment monsterGroupInfo on MonsterGroup {
      id,
      type
    }`,
};
const MonsterTrackerWithSubscription = AllMonsterGroupsContainer(MonsterTracker, fragments.monsterGroup, 'monsterGroupInfo');

export default withRouter(MonsterTrackerWithSubscription)
