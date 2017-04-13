import { css as aphroditecss, StyleSheet } from 'aphrodite';

export function css() {
  return {className: aphroditecss(...arguments)};
};

export function createStyleSheet(sheet) {
  return StyleSheet.create(sheet);
}