import TinyMCE from 'react-tinymce';
import React, {Component, PropTypes} from 'react';
import CustomSelect from './common/CustomSelect';
import Preloader from './common/Spinner';
import {Input, Row} from 'react-materialize';

const EditDocumentForm = ({
  preloader,
  submitAction,
  changeHandler,
  docRoles,
  DocRole,
  formDefaultData,
  checkboxHandler,
  tinymceEvent,
}) => {
  const {title, content, access} = formDefaultData;

  if (title.length) {
    return (
      <div className='edit-doc-form'>
        <form onSubmit={submitAction}>
          <Row>
            <Input
              s={6}
              name='title'
              id='title'
              label='Title'
              validate
              defaultValue={title}
              onChange={changeHandler}/>
            <CustomSelect
              addedClass='custom-select row'
              name='access'
              size={6}
              selectedValue={DocRole}
              selectData={docRoles}
              onChangeEvent={checkboxHandler}
              disabled='Choose your role'
              label='Role'
              CheckType={true}
              />  
          </Row>
          <Row className='left-padding'>
            <TinyMCE
              content={content}
              config={{
                 height : '280',
                 forced_root_block: false,
                 plugins: 'link image code',
                 toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
               }}
              onChange={tinymceEvent}
            />
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

EditDocumentForm.propTypes = {
  checkboxHandler: PropTypes.func,
  changeHandler: PropTypes.func,
  tinymceEvent: PropTypes.func,
  displayFeedBack: PropTypes.bool,
  preloader: PropTypes.bool,
  formDefaultData: PropTypes.object,
  docRoles: PropTypes.array,
  submitAction: PropTypes.func
};

export default EditDocumentForm;
