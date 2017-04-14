import React from 'react';
import { css, createStyleSheet } from 'Util/css';

const styles = createStyleSheet({
  input: {
    border: '2px solid black'
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
      onChangeProp(value);
    }
  }

  render() {
    const { defaultText, value } = this.props;
    return <input {...css(styles.input)} onChange={this.onChange} default={defaultText} value={value}/>
  }
}

export default Input;