import React from "react";
import PropTypes from "prop-types";

function DateTimePickerCustomInput({ id, value, onClick }) {
  return (
    <button id={id} className="ui labeled icon button fluid" onClick={onClick}>
      <i className="icon calendar" />
      {value}
    </button>
  );
}

DateTimePickerCustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  id: PropTypes.string
};

export default DateTimePickerCustomInput;
