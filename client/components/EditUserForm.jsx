import React, { PropTypes } from 'react';
import { Input, Row } from 'react-materialize';
import Preloader from './common/Spinner';
import CustomSelect from './common/CustomSelect';

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
  roles,
  selectedRole,
  submitAction,
  changeEvent,
}) => {
  let newRoles = roles;
  if (selectedRole < 3) {
    newRoles = [...roles];
    newRoles.splice(0, 1);
  }
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
          <Row>
            <CustomSelect
              addedClass="custom-select row"
              name="role"
              size={6}
              selectedValue={selectedRole}
              selectData={newRoles}
              onChangeEvent={changeEvent}
              disabled="Choose your role"
              label="Role"
              CheckType={''}
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
  preloader: PropTypes.bool.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  submitAction: PropTypes.string.isRequired,
  changeEvent: PropTypes.string.isRequired,
  roles: PropTypes.string.isRequired,
  selectedRole: PropTypes.string.isRequired,
};

export default EditUserForm;
