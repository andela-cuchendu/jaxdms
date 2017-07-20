import TinyMCE from 'react-tinymce';
import React, { PropTypes } from 'react';
import { Input, Row } from 'react-materialize';
import CustomSelect from './common/CustomSelect';
import Preloader from './common/Spinner';

/**
 * Represents Document Edit form
 *
 * @class EditDoc
 * @extends {Component}
 */
const EditDocumentForm = ({
  preloader,
  submitAction,
  changeEvent,
  docRoles,
  DocRole,
  formDefaultData,
  tinymceEvent,
}) => {
  const { title, content } = formDefaultData;
  let plugins = 'advlist autolink lists link image charmap ';
  plugins += 'print preview anchor insertdatetime media table contextmenu ';
  plugins += 'paste hr anchor pagebreak spellchecker code';
  let toolbar = 'insertfile undo redo | styleselect | bold italic | ';
  toolbar += 'alignleft aligncenter alignright alignjustify | bullist numlist ';
  toolbar += 'outdent indent | link image | print preview media fullpage | ';
  toolbar += 'forecolor backcolor emoticons | code';
  if (title.length) {
    return (
      <div className="edit-doc-form">
        <form onSubmit={submitAction}>
          <Row>
            <span>
              Note: This application can only allow 50,000 characters
            </span>
            <br />
            <p />
          </Row>
          <Row>
            <Input
              s={6}
              name="title"
              id="title"
              label="Title"
              validate
              defaultValue={title}
              onChange={changeEvent}
            />
            <CustomSelect
              addedClass="custom-select row"
              name="access"
              size={6}
              selectedValue={DocRole}
              selectData={docRoles}
              disabled="Choose your role"
              label="Role"
              CheckType={true}
            />
          </Row>
          <Row className="left-padding">
            <TinyMCE
              content={content}
              config={{
                height: '280',
                forced_root_block: false,
                plugins,
                toolbar,
              }}
              onChange={tinymceEvent}
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
EditDocumentForm.propTypes = {
  changeEvent: PropTypes.func.isRequired,
  tinymceEvent: PropTypes.func.isRequired,
  preloader: PropTypes.bool.isRequired,
  formDefaultData: PropTypes.string.isRequired,
  docRoles: PropTypes.string.isRequired,
  submitAction: PropTypes.func.isRequired,
  DocRole: PropTypes.string.isRequired,
};

export default EditDocumentForm;
