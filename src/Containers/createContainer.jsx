import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
  findValueIndex,
  addValue,
  updateValue,
  removeValue
} from 'Util/list';

function createContainer(
  initialQuery,
  subscriptionQuery,
  optionsFunction,
  dataPropName
) {
  return withData = graphql(initialQuery.query, {
    name: dataPropName,
    options: optionsFunction,
    props: props => {
      return {
        [dataPropName]: props[dataPropName],
        subscribeToData: params => {
          return props[dataPropName].subscribeToMore({
            document: subscriptionQuery.query,
            variables: optionsFunction(props.ownProps),
            updateQuery: (prev, {subscriptionData}) => {
              if (!subscriptionData.data) {
                return prev;
              }
              const prevEntries = prev[initialQuery.queryName];
              const newMonster = subscriptionData.data[subscriptionQuery.queryName];
              const { mutation, previousValues, node } = newMonster;
              let retList;
              switch (mutation) {
              case "CREATED":
                retList = addValue(prevEntries, node);
                break;
              case "UPDATED":
                retList = updateValue(prevEntries, node);
                break;
              case "DELETED":
                retList = removeValue(prevEntries, previousValues);
                break;
              default:
                retList = prevEntries;
              }

              return {
                ...prev,
                [initialQuery.queryName]: retList,
              }
            }
          });
        }
      }
    }
  });
}

export default createContainer;

export class Query {
  constructor(query, queryName) {
    this.query = query;
    this.queryName = queryName;
  }
}