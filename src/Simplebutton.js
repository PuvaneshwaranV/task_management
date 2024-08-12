import React from 'react';
import PropTypes from 'prop-types';

const SimpleButton = ({ label, handleClick }) => {
  return (
    <button className="btn btn-save btn-block" onClick={handleClick}>
      {label}
    </button>
  );
};

SimpleButton.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func
};

SimpleButton.defaultProps = {
  handleClick: () => {}
};

export default SimpleButton;
