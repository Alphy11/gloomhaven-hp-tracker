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
    onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { number, onChange } = this.props;
    const value = event.target.value;

    if(!number || !isNaN(value)) {
      onChange(value);
    }
  }

  render() {
    const { defaultText, value } = this.props;
    return <input {...css(styles.input)} onChange={onChange} default={defaultText} value={value}/>
  }
}

export default Input;