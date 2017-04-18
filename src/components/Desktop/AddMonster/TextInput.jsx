import React from 'react';
import Text from '../Text';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  input: {
    border: '2px solid black',
    float: 'left',
    height: '32px',
    marginLeft: '20px',
    width: '60%'
  },
  text: {
    width: '25%',
    marginLeft: '7.5%',
    float: 'left',
  }
})

class Input extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { number, onChange: onChangeProp } = this.props;
    const value = event.target.value;

    if(!number || !isNaN(value)) {
      const valueConverted = number ? value * 1 : value;
      onChangeProp(valueConverted);
    }
  }

  render() {
    const { value, number, name } = this.props;
    const defaultText = number ? 0 : "";
    return (
        <input {...css(styles.input)} onChange={this.onChange} default={defaultText} value={value}/>);
  }
}

export default Input;