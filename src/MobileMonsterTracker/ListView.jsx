import React from 'react';
import ListRow from './ListRow';

class ListView extends React.Component {
  render() {
    const { groups, groupTransform } = this.props;
    const transformedGroups =
            Object.entries(groups)
            .map(([key, values]) =>
              [
                <ListRow groupName={key}>key</ListRow>,
                ...values.map( value => <ListRow>{groupTransform(value)}</ListRow>)
              ]);
    return (
      <div>
        {transformedGroups}
      </div>);
  }
}

ListView.propTypes = {
  groups: React.PropTypes.object.isRequired,
  groupTransform: React.PropTypes.func.isRequired,
}

export default ListView;