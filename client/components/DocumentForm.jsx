import TinyMCE from 'react-tinymce';
import React, { PropTypes } from 'react';
import { Input, Row } from 'react-materialize';
import Spinner from './common/Spinner';
import CustomSelect from './common/CustomSelect';

/**
 * Represents Document form
 *
 * @param {object} - Object to build
 * this document form
 */
const NewDocumentForm = ({
  changeEvent,
  tinymceEvent,
  submitAction,
  showLoader,
  userRole,
}) => {
  const access = [
    {
      id: 1,
      access: -1,
      title: 'Public',
    },
    {
      id: 2,
      access: -2,
      title: 'Private',
    },
    {
      id: 3,
      access: userRole,
      title: 'Role',
    },
  ];
  return (
    <form onSubmit={submitAction}>
      <div id="createModal" className="modal modal-fixed-footer custom-modal">
        <div className="modal-content">
          <h4 className="custom-blue-text">Create new document</h4>
          <Row>
            <Input
              required
              s={6}
              name="title"
              label="Title"
              validate
              onChange={changeEvent}
            />
            <CustomSelect
              addedClass="custom-select row"
              name="access"
              size={6}
              selectedValue="-1"
              selectData={access}
              onChangeEvent={changeEvent}
              disabled="Choose your role"
              label="Role"
            />
          </Row>
          <Row>
            <TinyMCE
              config={{
                height: '160',
                forced_root_block: false,
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
              }}
              onChange={tinymceEvent}
            />
          </Row>
        </div>
        <div className="modal-footer">
          <Spinner
            size="small"
            position="left"
            showLoader={showLoader}
          />
          <button
            className="btn custom-doc-form custom-blue "
          >
          Create
          </button>
        </div>
      </div>
    </form>
  );
};
NewDocumentForm.defaultProps = {
  showLoader: PropTypes.bool,
};
NewDocumentForm.propTypes = {
  changeEvent: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  submitAction: PropTypes.func.isRequired,
  showLoader: PropTypes.bool,
  tinymceEvent: PropTypes.func.isRequired,
};

export default NewDocumentForm;
