import { css as aphroditecss, StyleSheet } from 'aphrodite';

export function css(args) {

  return {className: aphroditecss(args)};
};

export function createStyleSheet(sheet) {
  return StyleSheet.create(sheet);
}