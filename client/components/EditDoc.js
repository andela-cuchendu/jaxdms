import React, {Component, PropTypes} from 'react';
import {AppWrapper} from './Appwrapper';
import EditDocumentForm from './editForm';


export class EditDoc extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      access: ''
    };

    this.submitForm             = this.submitForm.bind(this);
    this.onChangeHandler        = this.onChangeHandler.bind(this);
    this.onClickCheckBox        = this.onClickCheckBox.bind(this);
    this.textEditorChangeEvent  = this.textEditorChangeEvent.bind(this);
  }

  componentWillMount() { 
    let seletedDoc = this.props.stateProp.userDocs.editDocumentData;
    const {title, access, content} = seletedDoc;
    if (!window.localStorage.getItem('token')) {
      this.context.router.push('/auth');
    }

    this.props.documentActions.updatePageWithEditData(this.props.params.id);
    this.setState({title, content, access});
  }

  componentWillReceiveProps(nextProps) {
    console.log('good luck', nextProps.stateProp.userDocs)
    const {
      editSuccess,
      editDocumentData,
      searchTerm
    } = nextProps.stateProp.userDocs;

    this.state = {
      title: editDocumentData.title,
      conent: editDocumentData.content,
      access: editDocumentData.access
    };

    if (editSuccess) {
      Materialize.toast('Document updated', 4000);
      this.context.router.push('/docs');
    }
  }


  onChangeHandler(event) {
    const {name, value} = event.target;
    this.state[name] = value;
  }

  submitForm(event) {
    event.preventDefault();
    this.state.access = this.state.access.toString();
    this.props.documentActions.upadateDocument(this.state, this.props.params.id);
  }

  textEditorChangeEvent(event) {
    this.state.content = event.target.getContent();
  }

  onClickCheckBox(event) {
    const value = event.target.value;
    const {access} = this.state;
  }

  render() {
    const EditProp = this.props.stateProp.userDocs.editDocumentData;  
const DocTitle =  EditProp.title;
const DocContent = EditProp.content;
const DocRole= EditProp.access;

  const DocAccess = [
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
      access: DocRole,
      title: 'Role'
    }
  ]    
    const {
      userDocs: {
        editPreLoader
      }
    } = this.props.stateProp;


console.log('Doc role access',DocRole )
    return (
      <div>
        <div className='content-container'>
          <div className='header-class'>Edit Document</div> 
        <EditDocumentForm
            preloader={editPreLoader}
            docRoles={DocAccess}
            DocRole={DocRole}
            submitAction={this.submitForm}
            checkboxHandler={this.onClickCheckBox}
            changeHandler={this.onChangeHandler}
            tinymceEvent={this.textEditorChangeEvent}
            formDefaultData={EditProp}
          />             
        </div>
      </div>
    );
  }
}

EditDoc.contextTypes = {
  router: PropTypes.object
};

EditDoc.propTypes = {
  onChangeHandler: PropTypes.func,
  stateProp: PropTypes.object,
  params: PropTypes.object,
  actions: PropTypes.object,
  logoutEvent: PropTypes.func,
  documentActions: PropTypes.object
};

export default AppWrapper(EditDoc);