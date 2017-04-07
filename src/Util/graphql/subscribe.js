import gql from 'graphql-tag';
import * as queryTransforms from './queryTransforms';
import {
  findValueIndex,
  addValue,
  updateValue,
  removeValue
} from 'Util/list';
// Keep as *, if imported with {}, we get an undefined error in subscribeToData.

function unsbuscribe(subscription) {
  subscription();
}

export function subscribeToData(component, query, propsToVariables) {
  const {
    linkedProp,
    unaliasedProp,
    componentWillRecieveProps,
    fragments,
  } = component;

   const queryWithFragments = queryTransforms.fragmentsAsString(fragments, query);

   const newWillRecieveProps = (newProps) => {
     componentWillRecieveProps(newProps);
     setupSubscription(component, linkedProp, newProps, query, unaliasedProp, propsToVariables);
   }

   return Object.assign(component, newWillRecieveProps);
}

export default function setupSubscription(component, propName, newProps, query, DataObjectName) {
  propsToOptions = component.propsToOptions || ( () => ({}) );
  if (!newProps.data.loading) {
      if (component.subscription) {
        if (newProps.data.allPosts !== component.props.data.allPosts) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          unsbuscribe(component.subscription);
        } else {
          // we already have an active subscription with the right params
          return
        }
      }

      component.subscription = newProps.data.subscribeToMore({
        document: query,
        variables: { ...propsToOptions(newProps) },

        updateQuery: ({[propName]: prevEntries}, {subscriptionData: newData}) => {
          const newObj = newData.data[DataObjectName]
          const newEntry = newObj.node;
          const mutatedValues = newObj.previousValues;
          const mutation = newObj.mutation;
          let retList;

          switch (mutation) {
            case "CREATED":
              retList = addValue(prevEntries, newEntry);
              break;
            case "UPDATED":
              retList = updateValue(prevEntries, newEntry);
              break;
            case "DELETED":
              retList = removeValue(prevEntries, mutatedValues);
              break;
            default:
              retList = prevEntries;
          }

          const retVal = {
            [propName]: retList,
          }
          return retVal;
        },

        onError: (err) => console.error(err),
      })
    }
}

