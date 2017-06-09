import TinyMCE from 'react-tinymce';
import React, {PropTypes} from 'react';
import Preloader from './common/Spinner';
import CustomSelect from './common/CustomSelect';
import {Input, Row} from 'react-materialize';
const NewDocumentForm = ({
  CheckboxHandler,
  changeHandler,
  tinymceEvent,
  submitAction,
  showLoader,
  docRoles,
  userRole
}) => {
  const access = [
    {
      id: 1,
      access: -1,
      title: 'Public'
    },
    {
      id:2,
      access:-2,
      title: 'Private'
    },
    {
      id:3,
      access: userRole,
      title: 'Role'
    }
  ]
  return (
    <form onSubmit={submitAction}> 
      <div id='createModal' className='modal modal-fixed-footer'>
        <div className='modal-content'>
          <h4 className='custom-blue-text'>Create new document</h4>
          <Row>
            <Input
              required
              s={6}
              name='title'
              label='Title'
              validate
              onChange={changeHandler}/>
            <CustomSelect
              addedClass='custom-select row'
              name='access'
              size={6}
              selectedValue='-1'
              selectData={access}
              onChangeEvent={changeHandler}
              disabled='Choose your role'
              label='Role'
              />
          </Row>
          <Row>
            <TinyMCE
              config={{
                 height : '160',
                 forced_root_block: false,
                 plugins: 'link image code',
                 toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
               }}
              onChange={tinymceEvent}
            />
          </Row>
        </div>
        <div className='modal-footer'>
          <Preloader
            size='small'
            position='left'
            showLoader={showLoader}
          />
          <button
            className='btn custom-create-doc custom-blue '>Create
          </button>                  
        </div>
      </div>
    </form>
  );

};

NewDocumentForm.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  docRoles: PropTypes.array.isRequired,
  CheckboxHandler: PropTypes.func.isRequired,
  submitAction: PropTypes.func.isRequired,
  showLoader: PropTypes.bool,
  tinymceEvent: PropTypes.func.isRequired
};

export default NewDocumentForm;
