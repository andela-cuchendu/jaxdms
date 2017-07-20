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
  let plugins = 'advlist autolink lists link image charmap ';
  plugins += 'print preview anchor insertdatetime media table contextmenu ';
  plugins += 'paste hr anchor pagebreak spellchecker code';
  let toolbar = 'insertfile undo redo | styleselect | bold italic | ';
  toolbar += 'alignleft aligncenter alignright alignjustify | bullist numlist ';
  toolbar += 'outdent indent | link image | print preview media fullpage | ';
  toolbar += 'forecolor backcolor emoticons | code';
  return (
    <form onSubmit={submitAction}>
      <div id="createModal" className="modal modal-fixed-footer custom-modal">
        <div className="modal-content">
          <h4 className="custom-blue-text">Create new document</h4>
          <Row>
            <span>
              Note: This application can only allow 50,000 characters
            </span>
            <br />
            <p />
          </Row>
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
                plugins,
                toolbar,
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
NewDocumentForm.propTypes = {
  changeEvent: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  submitAction: PropTypes.func.isRequired,
  showLoader: PropTypes.bool.isRequired,
  tinymceEvent: PropTypes.func.isRequired,
};

export default NewDocumentForm;
