import React, { PropTypes } from 'react';

/**
 * Represents the Plus Icon
 * @param {object} - Object passed as props
 * used in building this
 * @return {htmlElements} - Html Element
 * representing this icon
 * @description - This icon is used like a create
 * button but floats
 */
const Plus = ({ clickEvent }) => {
  return (
    <div className="plus">
      <a
        onClick={clickEvent}
        className="btn-floating btn-large waves-effect waves-light"
      >
        <i className="material-icons">add</i>
      </a>
    </div>
  );
};

Plus.propTypes = {
  clickEvent: PropTypes.func.isRequired,
};

export default Plus;
