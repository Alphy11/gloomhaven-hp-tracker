import gql from 'graphql-tag';
import React from 'react';

import AllMonsterGroupsContainer from 'Containers/allMonsterGroupsContainer';

import ListView from './ListView';
import MonsterGroupList from './MonsterGroupList';
import AddMonsterButton from './AddMonsterButton';
import AddMonster from '../AddMonster';

class MonsterListView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddMonster: false,
    };

    this.toggleShowAddMonster = this.toggleShowAddMonster.bind(this);
  }

  toggleShowAddMonster(show) {
    this.setState({
      ...this.state,
      showAddMonster: show,
    });
  }

  render() {
    const { monsterGroups } = this.props;
    const { showAddMonster } = this.state;
    return (showAddMonster
      ? <AddMonster toggle={this.toggleShowAddMonster} group={monsterGroups[0]} />
      : <ListView>
        {monsterGroups.map(
              group =>
                <MonsterGroupList id={group.id} type={group.type} key={group.id} />)}
        <AddMonsterButton toggle={this.toggleShowAddMonster} />
      </ListView>);
  }
}

const fragments = {
  monsterListView: gql`
    fragment monsterListView on MonsterGroup {
      id,
      type,
      monsters {
        number
      }
    }`,
};

export default AllMonsterGroupsContainer(MonsterListView, fragments.monsterListView, 'monsterListView');
