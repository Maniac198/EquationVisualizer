import React from 'react';
import './Layout.css'; // Import the CSS file for styling

const Layout = ({ sidebar, children }) => {
  return (
    <div className="layout">
      <div className="sidebar">
        {sidebar}
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
