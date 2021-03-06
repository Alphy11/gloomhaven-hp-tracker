import React from 'react';

import {
  addValue,
  updateValue,
  removeValue,
} from 'Util/list';

import * as queryTransforms from './queryTransforms';

// Keep as *, if imported with {}, we get an undefined error in subscribeToData.

function unsbuscribe(subscription) {
  subscription();
}


function subscriptionQuery(fragments, type, relationName) {
  const fragmentsAsQuery = queryTransforms.allFragmentsAsQuery(fragments);

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
    }`;
  return queryTransforms.queryWithFragments(fragments, subscriptionTemplate);
}


export default function setupSubscription(WrappedComponent, newProps, objectName, relationName) {
  const propsToOptions = WrappedComponent.propsToOptions || (props => props);
  const query = subscriptionQuery(WrappedComponent.fragments, objectName, relationName);

  if (!newProps.data.loading) {
    if (WrappedComponent.subscription) {
      if (newProps.data.allPosts !== WrappedComponent.props.data.allPosts) {
          // if the feed has changed, we need to unsubscribe before resubscribing
        unsbuscribe(WrappedComponent.subscription);
      } else {
          // we already have an active subscription with the right params
        return;
      }
    }

    // eslint-disable-next-line no-param-reassign
    WrappedComponent.subscription = newProps.data.subscribeToMore({
      document: query,
      variables: { ...propsToOptions(newProps) },

      updateQuery: ({ [objectName]: prevEntries }, { subscriptionData: newData }) => {
        const newObj = newData.data[objectName];
        const newEntry = newObj.node;
        const mutatedValues = newObj.previousValues;
        const mutation = newObj.mutation;
        let retList;

        switch (mutation) {
          case 'CREATED':
            retList = addValue(prevEntries, newEntry);
            break;
          case 'UPDATED':
            retList = updateValue(prevEntries, newEntry);
            break;
          case 'DELETED':
            retList = removeValue(prevEntries, mutatedValues);
            break;
          default:
            retList = prevEntries;
        }

        const retVal = {
          [objectName]: retList,
        };
        return retVal;
      },

      // eslint-disable-next-line no-console
      onError: err => console.error(err),
    });
  }
}

export function subscribeToData(objectName, relationName) {
  return function getSubscriptionHOC(Wrappedcomponent) {
    return class subscriptionHOC extends React.Component {
      static get fragments() {
        return Wrappedcomponent.fragments;
      }

      static get displayName() {
        return `subscriptionHOC(${Wrappedcomponent.name}`;
      }

      componentWillReceiveProps(newProps) {
        setupSubscription(Wrappedcomponent, newProps, objectName, relationName);
      }

      render() {
        return <Wrappedcomponent {...this.props} />;
      }
      };
  };
}
