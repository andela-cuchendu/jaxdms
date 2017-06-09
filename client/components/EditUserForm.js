import React, {Component, PropTypes} from 'react';
import CustomSelect from './common/CustomSelect';
import Preloader from './common/Spinner';
import {Input, Row} from 'react-materialize';

const EditUserForm = ({
  preloader,
  firstname,
  lastname,
  submitAction,
  changeHandler,
}) => {

  if (firstname.length) {
    return (
      <div className='edit-doc-form'>
        <form onSubmit={submitAction}>
          <Row>
            <Input
              s={6}
              name='firstname'
              id='firstname'
              label='Firstname'
              validate
              defaultValue={firstname}
              onChange={changeHandler}/>
          </Row>
          <Row className='left-padding'>
            <Input
              s={6}
              name='lastname'
              id='lastname'
              label='Lastname'
              validate
              defaultValue={lastname}
              onChange={changeHandler}/>
          </Row>
          <span
            className='edit-user-error'></span>
          <Preloader
            showLoader={preloader}
            size='small'
            position='left'/>
          <button
            className='btn custom-update-btn right'>Update
          </button>
        </form>
      </div>
    );
  } else {
    return (<div></div>);
  }
};

EditUserForm.propTypes = {
  preloader: PropTypes.bool,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  submitAction: PropTypes.func,
  changeHandler: PropTypes.func
};

export default EditUserForm;
