import React from 'react';
import { Redirect } from 'react-router-dom';
import { css, createStyleSheet } from 'Util/css';
import createAddMonsterContainer from 'Containers/createAddMonsterContainer';
import Input from './Input';

const styles = createStyleSheet({
  submit: {
    //height: '40px',
    //width: '40px',
  }
})

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
    this.setState({...this.state, close: true});
  }

  submit() {
    this.props.submit();
    this.close();
  }

  render() {
    if(this.state.close) {
      return (<Redirect to={`/nonmobile`} />);
    }

    return (
      <div>
        <Input {...this.props.createInputProps('Type', false)}/>
        <Input {...this.props.createInputProps('elite', false)}/>
        <Input {...this.props.createInputProps('normal', false)}/>
        <Input {...this.props.createInputProps('hp', false)}/>
        <button {...css(styles.submit)} onClick={this.submit}>
          Submit
        </button>
      </div>);
  }
}

export default createAddMonsterContainer(AddMonster);