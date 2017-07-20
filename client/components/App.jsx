import React, { PropTypes } from 'react';

/**
 * From here every other componenet is called
 */
const App = (props) => <div>{props.children}</div>;


App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
