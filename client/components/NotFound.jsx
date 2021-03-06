import React from 'react';
import { AppWrapper } from './AppWrapper';

/**
 * Represents the NotFound page
 */
const NotFound = () => {
  return (
    <div className="container">
      <div className="card-panel">
        <div className="row">
          <h2 className="header center-align">Not Found</h2>
        </div>
        <div className="row">
          <p className="flow-text center-align">
            We could not find the page you were looking for.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppWrapper(NotFound);
