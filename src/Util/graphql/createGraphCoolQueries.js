import { queryWithFragments, allFragmentsAsQuery } from './queryTransforms';
import subscriptionSetup, { subscribeToData } from 'Util/graphql/subscribe';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export function getAndSubscribeToAllInGroup(component, type, relationName ) {
  const { propsToOptions, fragments } = component;
  const subQuery = subscriptionQuery(fragments, type, relationName);
  const obQuery = objectQuery(fragments, type, relationName);

  const componentWithSubscription = subscribeToData(component, subQuery, propsToOptions);

  return graphql(obQuery, {
    options: propsToOptions
  })(componentWithSubscription)
}

export function objectQuery(fragments , type, relationName) {
  const fragmentsAsQuery = allFragmentsAsQuery(fragments);
  const queryTemplate = gql`
    query ${type}s($id: ID){
      all${type}s(
        filter: {
          ${relationName}: {
            id: $id
          }
      }) {
        id,
        ${fragmentsAsQuery}
      }
    }`;
  return queryWithFragments(fragments, queryTemplate);
}

export function subscriptionQuery(fragments, type, relationName) {
  const fragmentsAsQuery = allFragmentsAsQuery(fragments);

  const subscriptionTemplate =
    `subscription ($id: ID!) {
      ${type}(
        filter: {
          mutation_in: [CREATED, UPDATED, DELETED],
          node: {
            ${relationName}: {
              id: "$id"
            }
          }
        }
      ) {
        node {
          ${fragmentsAsQuery}
        },
        mutation,
        previousValues {
          id
        }
      }
    }`
  return queryWithFragments(fragments, subscriptionTemplate);
}

