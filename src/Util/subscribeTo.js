import { subscribeToData } from './graphql/subscribe';
import { allFragmentsAsQuery, queryWithFragments } from './graphql/queryTransforms';

export default function subscribeTo(objectName, relationName) {
  return (component) => {
    const query = subscriptionQuery(component.fragments, objectName, relationName);
    return subscribeToData(component, query, ({id}) => id);
  };
}

function subscriptionQuery(fragments, type, relationName) {
  const fragmentsAsQuery = allFragmentsAsQuery(fragments);

  const subscriptionTemplate =
    `subscription ($id: ID!) {
      ${type}(
        filter: {
          mutation_in: [CREATED, UPDATED, DELETED],
          node: {
            ${relationName}: {
              id: $id
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