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
            const selectedOption = selectedValue === item.access;
            return (
              <option
                selected={selectedOption}
                defaultValue={selectedValue}
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
CustomSelect.propTypes = {
  selectData: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
  addedClass: PropTypes.string.isRequired,
  selectedValue: PropTypes.number.isRequired,
  onChangeEvent: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  CheckType: PropTypes.string,
};

export default CustomSelect;
