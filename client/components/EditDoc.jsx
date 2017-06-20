import React, { Component, PropTypes } from 'react';
import { AppWrapper } from './AppWrapper.jsx';
import EditForm from './EditForm.jsx';

/**
 * Represents Document Edit
 *
 * @class EditDoc
 * @extends {Component}
 */
export class EditDoc extends Component {
  /**
   * Creates an instance of EditDoc.
   *
   * @memberOf EditDoc
   */
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      access: '',
    };

    this.submitForm = this.submitForm.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.textEditorChangeEvent = this.textEditorChangeEvent.bind(this);
  }

  /**
   * componentWillMount
   *
   *
   * @memberOf EditDoc
   */
  componentWillMount() {
    const seletedDoc = this.props.stateProp.userDocs.docEdit;
    const { title, access, content } = seletedDoc;
    if (!window.localStorage.getItem('token')) {
      this.context.router.push('/auth');
    }

    this.props.documentActions.EditData(this.props.params.id);
    this.setState({ title, content, access });
  }

  /**
   * componentWillReceiveProps
   *
   * @param {any} nextProps - Props from store
   *
   * @memberOf EditDoc
   */
  componentWillReceiveProps(nextProps) {
    const {
      editSuccess,
      docEdit,
    } = nextProps.stateProp.userDocs;

    this.state = {
      title: docEdit.title,
      conent: docEdit.content,
      access: docEdit.access,
    };

    if (editSuccess) {
      Materialize.toast('Document updated', 4000);
      this.context.router.push('/docs');
    }
  }

  /**
   * onChangeEvent - Called when input
   * elemets change
   *
   * @param {any} event -Dom event
   *
   * @memberOf EditDoc
   */
  onChangeEvent(event) {
    const { name, value } = event.target;
    this.state[name] = value;
  }

  /**
   * submitForm - Called when the edit
   * document form is submited
   *
   * @param {any} event -Dom Event
   *
   * @memberOf EditDoc
   */
  submitForm(event) {
    event.preventDefault();
    this.state.access = this.state.access.toString();
    this.props.documentActions.upadateDoc(this.state, this.props.params.id);
  }

  /**
   * textEditorChangeEvent - Called when the
   * text editor changes
   *
   * @param {any} event -Dom Event
   *
   * @memberOf EditDoc
   */
  textEditorChangeEvent(event) {
    this.state.content = event.target.getContent();
  }

  render() {
    const EditProp = this.props.stateProp.userDocs.docEdit;
    const DocRole = EditProp.access;
    const DocAccess = [
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
        access: DocRole,
        title: 'Role',
      },
    ];
    const {
      userDocs: {
        editPreLoader,
      },
    } = this.props.stateProp;
    return (
      <div>
        <div className="content-container">
          <div className="header-class">Edit Document</div>
          <EditForm
            preloader={editPreLoader}
            docRoles={DocAccess}
            DocRole={DocRole}
            submitAction={this.submitForm}
            changeEvent={this.onChangeEvent}
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
  onChangeEvent: PropTypes.func,
  stateProp: PropTypes.object,
  params: PropTypes.object,
  actions: PropTypes.object,
  logoutEvent: PropTypes.func,
  documentActions: PropTypes.object
};

export default AppWrapper(EditDoc);
