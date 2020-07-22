import React from 'react';
const Dropdown = ({children, wrappedRef}) => <section ref={wrappedRef} className="custom__dropdown">{children}</section>
export default Dropdown;