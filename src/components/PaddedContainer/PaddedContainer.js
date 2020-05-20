import React from 'react';
const PaddedContainer = ({ padding, children }) => {
  return <div style={{ padding: padding }}>{children}</div>;
};
export default PaddedContainer;
