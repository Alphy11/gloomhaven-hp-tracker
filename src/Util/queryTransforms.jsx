import gql from 'graphql-tag';

export const fragmentsAsString = function (fragments) {
  return fragments
          ? Object.values(fragments)
              .reduce(
                (acc, val) =>
                  gql`${acc}
                   ${val}`, '')
          : '';
};

export const queryWithFragments = function (fragments, query) {
  return gql`${query}${fragmentsAsString(fragments)}`;
};

export const allFragmentsAsQuery = function (fragments) {
  return Object.keys(fragments)
          .reduce(
            (acc, key) =>
              `${acc}
              ...${key}`, '');
};
