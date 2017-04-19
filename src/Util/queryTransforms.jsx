import gql from 'graphql-tag';

export function fragmentsAsString(fragments) {
  return fragments
          ? Object.values(fragments)
              .reduce(
                (acc, val) =>
                  gql`${acc}
                   ${val}`, '')
          : '';
}

export function queryWithFragments(fragments, query) {
  return gql`${query}${fragmentsAsString(fragments)}`;
}

export function allFragmentsAsQuery(fragments) {
  return Object.keys(fragments)
          .reduce(
            (acc, key) =>
              `${acc}
              ...${key}`, '');
}
