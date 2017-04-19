import { css as aphroditecss, StyleSheet } from 'aphrodite';

export function css(...styles) {
  return { className: aphroditecss(...styles) };
}

export function createStyleSheet(sheet) {
  return StyleSheet.create(sheet);
}
