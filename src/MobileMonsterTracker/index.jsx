import React from 'react';
import ListView from './ListView';
import ListItem from './ListItem';

export default function page() {
  const groups = {
    group1: ["item1.1", "item1.2"],
    group2: ["item2.1", "item2.1"],
  };
  return <ListView groups={groups} groupTransform={(item) => item} />
}