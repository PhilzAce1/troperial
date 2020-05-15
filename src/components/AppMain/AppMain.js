import React from 'react';
import './AppMain.css';

const AppMain = ({children}) => {
    return (
        <main className="listing__main-container">
            {/* Banner component */}
            {children}
        </main>
    )
}

export default AppMain;
