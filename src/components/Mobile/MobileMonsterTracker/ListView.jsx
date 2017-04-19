/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import ListRow from './ListRow';

class ListView extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>);
  }
}

ListView.propTypes = {
};

export default ListView;

/* eslint-enable */
