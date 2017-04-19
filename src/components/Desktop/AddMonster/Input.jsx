import React from 'react';
import { css, createStyleSheet } from 'Util/css';
import Text from '../Text';
import TextInput from './TextInput';

const styles = createStyleSheet({
  label: {
    float: 'left',
    paddingBottom: '20px',
  },
  top: {
    width: '100%',
    display: 'inline-block',
  },
});

function Input(props) {
  const { name } = props;
  return (
    <div {...css(styles.top)}>
      <div {...css(styles.label)}><Text>{name}</Text></div>
      <TextInput {...props} />
    </div>);
}

export default Input;
