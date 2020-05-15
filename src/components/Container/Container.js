import React from 'react';
import './Container.css';
const Container = ({ children, showBackDrop }) => {
  return (
    <div
      className={`app__container ${
        showBackDrop ? 'maxHeight' : 'minHeight'
      }`}
    >
      {children}
    </div>
  );
};
export default Container;
