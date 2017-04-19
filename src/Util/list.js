export function findValueIndex(list, newValue) {
  return list.findIndex(entry => entry.id === newValue.id);
}

export function placeValuesAtIndex(list, values, index) {
  return [...list.slice(0, index), ...values, ...list.slice(index + 1)];
}

export function addValue(list, newValue) {
  return placeValuesAtIndex(list, [newValue], list.length);
}

export function updateValue(list, newValue) {
  return placeValuesAtIndex(list, [newValue], findValueIndex(list, newValue));
}

export function removeValue(list, oldValue) {
  return placeValuesAtIndex(list, [], findValueIndex(list, oldValue));
}

