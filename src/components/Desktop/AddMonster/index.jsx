import React from 'react';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import { css, createStyleSheet } from 'Util/css';
import createAddMonsterContainer from 'Containers/createAddMonsterContainer';
import AllMonsterGroupsContainer from 'Containers/allMonsterGroupsContainer';
import AllMonstersContainer from 'Containers/allMonstersContainer';
import Input from './Input';
import Text from '../Text';

const styles = createStyleSheet({
  submit: {
    // height: '40px',
    // width: '40px',
  },
});

class AddMonster extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      close: false,
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
  }

  close() {
    this.setState({ ...this.state, close: true });
  }

  submit(event) {
    if (this.props.submit(event)) {
      this.close();
    } else {
      this.setState({ ...this.state, invalidType: true });
    }
  }

  render() {
    if (this.state.close) {
      return (<Redirect to={'/nonmobile'} />);
    }

    return (
      <div>
        {this.state.invalidType
          && <Text type="error" >Invlid type, please use camel case(eg. BanditArcher)</Text>}
        <Input {...this.props.createInputProps('type', false)} />
        <Input {...this.props.createInputProps('elites', true)} />
        <Input {...this.props.createInputProps('normals', true)} />
        <Input {...this.props.createInputProps('hp', true)} />

        <button {...css(styles.submit)} onClick={this.submit}>
          Submit
        </button>
      </div>);
  }
}

const allMonsterFragment = gql`
  fragment allMonsterFragment on MonsterGroup {
    id,
    type
  }
`;

const AddMonsterWithData = createAddMonsterContainer(AddMonster);
const AddMonsterwithGroups = AllMonsterGroupsContainer(AddMonsterWithData, allMonsterFragment, 'allMonsterFragment');
const AddMonsterWithMonsters = AllMonstersContainer(AddMonsterwithGroups);
export default AddMonsterWithMonsters;
