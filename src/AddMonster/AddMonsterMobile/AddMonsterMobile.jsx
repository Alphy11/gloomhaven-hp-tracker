import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { css, createStyleSheet } from 'Util/css';
import Input from './Input';
import createAddMonsterContainer from '../createAddMonsterContainer';

const styles = createStyleSheet({
  closeButton: {
    float: 'right',
    marginRight: '25px',
  }
});

function AddMonsterMobile({ createInputProps, submit, close, group }) {
    const isNumber = true;

    return (
      <div>
        <div {...css(styles.closeButton)} onClick={close}> <h3>X</h3> </div>
        <div>
          Normals: <Input {...createInputProps('normals', isNumber)}/>
        </div>
        <div>
          Elites: <Input {...createInputProps('elites', isNumber)}/>
        </div>
        <div>
          Max HP: <Input {...createInputProps('hp', isNumber)}/>
        </div>
        <button onClick={submit}>Submit</button>
      </div>);
}

export default AddMonsterMobile;