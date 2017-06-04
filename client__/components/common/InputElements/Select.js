import React, {PropTypes} from 'react';
import {Input, Row} from 'react-materialize';

/**
 * Represents Select Element
 * @param {object} object0 - The object for building the select input
 */
const Select = ({
  selectData, 
  size, 
  addedClass, 
  selectedValue, 
  onChangeEvent, 
  name
}) => {
  return (
    <Row className={addedClass}>
      <Input
        name={name}
        onChange={onChangeEvent}
        s={size}
        type='select'
        label='Role'>
        <option disabled>Choose your role</option>
        {
          selectData.map((item) => {
            let selectedOption = selectedValue === item.id ? 'selected' : false;
            console.log('mapping',item)
            return (
              <option
                selected={selectedOption}
                key={item.access}
                value={item.title}>
                {item.title}
              </option>
            );
          })
        }
      </Input>
    </Row>
  );
};

Select.propTypes = {
  selectData: PropTypes.array.isRequired,
  size: PropTypes.number,
  addedClass: PropTypes.string,
  selectedValue: PropTypes.number,
  onChangeEvent: PropTypes.func,
  name: PropTypes.string
};

export default Select;