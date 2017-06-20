import React, { PropTypes } from 'react';

/**
 *
 * @class App
 * @extends {React.Component}
 * @description Represents the APP.
 * From here every other componenet is called
 */
class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
