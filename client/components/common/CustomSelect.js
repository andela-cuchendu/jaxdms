import React, {PropTypes} from 'react';
import {Input, Row} from 'react-materialize';

/**
 * Represents Select Element
 * @param {object} object0 - The object for building the select input
 */
const CustomSelect = ({
  selectData, 
  size, 
  addedClass, 
  selectedValue, 
  onChangeEvent, 
  name,
  disabled,
  label,
  CheckType
}) => {
  return (
    <Row className={addedClass}>
      <Input
        name={name}
        onChange={onChangeEvent}
        s={size}
        type='select'
        label={label}>
        <option disabled>{disabled}</option>
        {
          selectData.map((item) => {

            let selectedOption ;
            if (CheckType != undefined){
              selectedOption = parseInt(selectedValue) === item.access ? 'selected' : false;
            } else {
              selectedOption = parseInt(selectedValue) === item.id ? 'selected' : false;
            }            
            return (
              <option
                selected={selectedOption}
                key={item.id}
                value={item.access}>
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
  size: PropTypes.number,
  addedClass: PropTypes.string,
  selectedValue: PropTypes.number,
  onChangeEvent: PropTypes.func,
  name: PropTypes.string
};

export default CustomSelect;