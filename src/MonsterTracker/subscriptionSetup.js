function unsbuscribe(subscription) {
  subscription();
}

function findValueIndex(list, newValue) {
  return list.findIndex((entry) => entry.id === newValue.id)
}

function addValue(list, newValue) {
  return placeValuesAtIndex(list, [newValue], list.length);
}

function updateValue(list, newValue) {
  return placeValuesAtIndex(list, [newValue], findValueIndex(list, newValue))
}

function removeValue(list, oldValue) {
  return placeValuesAtIndex(list, [], findValueIndex(list, oldValue));

}

function placeValuesAtIndex(list, values, index) {
  return [...list.slice(0,index), ...values, ...list.slice(index+1)];
}


export default function setupSubscription(component, propName, newProps, query, DataObjectName) {
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
        variables: null,

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

