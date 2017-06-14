import React, { PropTypes } from 'react';
import { Input, Row } from 'react-materialize';
/**
 * Represents Select HTML Element
 * @param {object} object0 - The objects for
 * building this input.
 * @return {htmlElement} - Rendered html select
 * element
 */
const CustomSelect = ({
  selectData,
  size,
  addedClass,
  selectedValue,
  onChangeEvent,
  name,
  label,
  CheckType,
}) => {
  return (
    <Row className={addedClass}>
      <Input
        name={name}
        onChange={onChangeEvent}
        s={size}
        type="select"
        label={label}
      >
        {
          selectData.map((item) => {
            let selectedOption;
            if (CheckType !== undefined) {
              selectedOption = parseInt(selectedValue, 10) === item.access ? 'selected' : false;
            } else {
              selectedOption = parseInt(selectedValue, 10) === item.id ? 'selected' : false;
            }
            return (
              <option
                selected={selectedOption}
                key={item.id}
                value={item.access}
              >
                {item.title}
              </option>
            );
          })
        }
      </Input>
    </Row>
  );
};
CustomSelect.defaultProps = {
  selectData: [],
  size: 6,
  addedClass: '',
  selectedValue: -1,
  name: PropTypes.string,
  label: PropTypes.string,
  CheckType: PropTypes.string,
};
CustomSelect.propTypes = {
  selectData: PropTypes.array.isRequired,
  size: PropTypes.number,
  addedClass: PropTypes.string,
  selectedValue: PropTypes.number,
  onChangeEvent: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  CheckType: PropTypes.string,
};

export default CustomSelect;
