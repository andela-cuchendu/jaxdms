import React, { PropTypes } from 'react';

/**
 * Represents the spinner
 * @param {object} - Object passed as props
 * used in building this spinner
 * @return {htmlElements} - Html Element
 * representing this spinner
 */
const Spinner = ({ showLoader, size, position }) => {
  const displayLoader = showLoader ? { display: 'none' } : { display: 'block' };

  return (
    <div className={position} style={displayLoader}>
      <div className={`preloader-wrapper ${size} active spinner`}>
        <div className="spinner-layer spinner-color">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  );
};
Spinner.propTypes = {
  showLoader: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default Spinner;
