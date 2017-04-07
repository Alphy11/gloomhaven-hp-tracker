import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {withRouter} from 'react-router'

import MonsterGroup from './MonsterGroup';
import subscriptionSetup from './subscriptionSetup';

class MonsterTracker extends React.Component {

  componentWillReceiveProps(newProps) {
    const query = gql`
      subscription {
        MonsterGroup(filter: {mutation_in: [CREATED, UPDATED, DELETED]}) {
          node {
            ...monsterGroupInfo
          },
          mutation,
          previousValues {
            id
          }
        }
      }
      ${MonsterTracker.fragments.monsterGroup}`;
    subscriptionSetup(this, MonsterTracker.propName, newProps, query, "MonsterGroup");
  }

  render() {
    const monsterGroups = this.props.data[MonsterTracker.propName] || [];
    return (
      <div>
        {monsterGroups.map(
          monsterGroup =>
            <MonsterGroup
              monsterGroup={monsterGroup}
              key={monsterGroup.id} />
        )}
      </div>
    );
  }
}

MonsterTracker.propName = "allMonsterGroups";

MonsterTracker.propTypes = {
    data: React.PropTypes.object,
  }

MonsterTracker.fragments = {
  monsterGroup: gql`
    fragment monsterGroupInfo on MonsterGroup {
      id,
      type
    }`,
};

const MonsterGroupQuery = gql`
  query {
    ${MonsterTracker.propName}: allMonsterGroups {
      ...monsterGroupInfo
    }
  }
  ${MonsterTracker.fragments.monsterGroup}`;

const MonsterTrackerWithData = graphql(MonsterGroupQuery, {
  options: ({params}) => ({
    // variables: {
    //   id: params.id
    // }
  })
})(MonsterTracker)

// const DetailPageWithDelete = graphql(deleteMutation)(DetailPageWithData)

export default withRouter(MonsterTrackerWithData)
