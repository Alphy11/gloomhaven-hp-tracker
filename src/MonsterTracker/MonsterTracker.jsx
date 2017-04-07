import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router';

import subscriptionSetup from 'Util/graphql/subscribe';

import MonsterGroup from './MonsterGroup';

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
          ({ type, monsters, id }) =>
            <MonsterGroup
              id={id}
              monsterGroupType={type}
              monsters={monsters}
              key={id} />
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
      type,
      monsters {
        ...monsterInfoWithId
      }
    }
    ${MonsterGroup.fragments.monsterInfoWithId}`,
};

const MonsterGroupQuery = gql`
  query {
    ${MonsterTracker.propName}: allMonsterGroups {
      ...monsterGroupInfo
    }
  }
  ${MonsterTracker.fragments.monsterGroup}`;

const MonsterTrackerWithData = graphql(MonsterGroupQuery)(MonsterTracker)

// const DetailPageWithDelete = graphql(deleteMutation)(DetailPageWithData)

export default withRouter(MonsterTrackerWithData)
