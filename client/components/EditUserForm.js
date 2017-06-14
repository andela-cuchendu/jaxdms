import React, { PropTypes } from 'react';
import { Input, Row } from 'react-materialize';
import Preloader from './common/Spinner';

/**
 * Represents the Edit User Form
 *
 * @return {htmlelement} returns form
 * element
 */
const EditUserForm = ({
  preloader,
  firstname,
  lastname,
  submitAction,
  changeEvent,
}) => {

  if (firstname.length) {
    return (
      <div className="edit-doc-form">
        <form onSubmit={submitAction}>
          <Row>
            <Input
              s={6}
              name="firstname"
              id="firstname"
              label="Firstname"
              validate
              defaultValue={firstname}
              onChange={changeEvent}
            />
          </Row>
          <Row className="left-padding">
            <Input
              s={6}
              name="lastname"
              id="lastname"
              label="Lastname"
              validate
              defaultValue={lastname}
              onChange={changeEvent}
            />
          </Row>
          <span
            className="edit-user-error"
          />
          <Preloader
            showLoader={preloader}
            size="small"
            position="left"
          />
          <button
            className="btn custom-update-btn right"
          >
            Update
          </button>
        </form>
      </div>
    );
  } else {
    return (<div />);
  }
};

EditUserForm.propTypes = {
  preloader: PropTypes.bool,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  submitAction: PropTypes.func,
  changeEvent: PropTypes.func
};

export default EditUserForm;
