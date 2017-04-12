import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { css, createStyleSheet } from 'Util/css';
import Input from './Input';

const styles = createStyleSheet({
  closeButton: {
    float: 'right',
    marginRight: '25px',
  }
});

class AddMonster extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      type: "",
      normals: 1,
      elites: 0,
      hp: 12,
    }
    this.trackType = this.trackType.bind(this);
    this.trackNormals = this.trackNormals.bind(this);
    this.trackElites = this.trackElites.bind(this);
    this.trackHp = this.trackHp.bind(this);
    this.submit = this.submit.bind(this);
  }


  trackType(event) {
    this.setState({
      ...this.state,
      type: event.target.value
    });
  }

  trackNormals(value) {
    this.setState({
      ...this.state,
      normals: value,
    })
  }

  trackElites(value) {
    this.setState({
      ...this.state,
      elites: value,
    })
  }

  trackHp(value) {
    this.setState({
      ...this.state,
      hp: value,
    })
  }

  submit(){
    const { hp, types, normals, elites } = this.state;
    Array(normals + elites).fill().forEach(
      (val, index) =>
        this.props.createMonster({
          hp,
          maxHp: hp,
          number: 0,
          monsterGroupId: this.props.group.id,
          elite: index > normals - 1,
        })
    );
  }

  render(){
    const { elites, hp, normals, type } = this.state;
    const { group } = this.props;
    return (
      <div>
        <div {...css(styles.closeButton)} onClick={() => this.props.toggle(true)}> <h3>X</h3> </div>
        <div>
          <h1>Type: </h1><Input onChange={this.trackType} value={type} defaultText="BanditGuard"/>
        </div>
        <div>
          Normals: <Input onChange={this.trackNormals} number value={normals}/>
        </div>
        <div>
          Elites: <Input onChange={this.trackElites} number value={elites}/>
        </div>
        <div>
          Max HP: <Input onChange={this.trackHp} number value={hp}/>
        </div>
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

const createMonster = gql`
  mutation addMonster(
    $elite: Boolean
    $hp: Int!
    $number: Int!
    $monsterGroupId: ID
  ) {
    createMonster(
      hp: $hp,
      maxHp: $hp,
      number: $number,
      monsterGroupId: $monsterGroupId,
      elite: $elite
    ) {
      id,
      hp,
      maxHp,
      number,
      monsterGroup {
        id
      }
    }
  }`

const AddMonsterWithMutation = graphql(
  createMonster,
  {
    props: ({ ownProps, mutate }) => ({
      createMonster({ elite, hp, number, monsterGroupId }) {
        return mutate({
          variables: { elite, hp, number, monsterGroupId },
        });
      },
    }),
  },
)(AddMonster);

export default AddMonsterWithMutation;