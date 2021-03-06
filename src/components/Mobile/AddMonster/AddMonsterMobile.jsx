import React from 'react';
import { css, createStyleSheet } from 'Util/css';
import Input from './Input';
import Text from '../Text';

const styles = createStyleSheet({
  closeButton: {
    float: 'right',
    marginRight: '25px',
  },
  row: {
    width: '100%',
    height: '5%',
  },
  button: {
    width: '200px',
    textSize: '32px',
  },
});

function AddMonsterMobile({ createInputProps, submit, close, group }) {
  const isNumber = true;

  return (
    <div>
      <button {...css(styles.closeButton)} onClick={close}> <h3>X</h3> </button>
      <div {...css(styles.row)}>
        <Text>{group.type}</Text>
      </div>
      <div {...css(styles.row)}>
        <Input {...createInputProps('normals', isNumber)} />
      </div>
      <div {...css(styles.row)}>
        <Input {...createInputProps('elites', isNumber)} />
      </div>
      <div {...css(styles.row)}>
        <Input {...createInputProps('hp', isNumber)} />
      </div>
      <button {...css(styles.button)} onClick={submit}>Submit</button>
    </div>);
}

export default AddMonsterMobile;
