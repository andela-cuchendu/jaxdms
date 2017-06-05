import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import DocumentForm from './DocumentForm';
import * as DocActions from '../actions/DocActions';
import * as RolesActions from '../actions/RolesActions';
import * as UserAction from '../actions/UserAction';
import {AppWrapper} from './Appwrapper';


export class Documents extends Component {
  constructor() {
    super();

    this.addMoreDocs              = this.addMoreDocs.bind(this);
    this.viewDocEvent             = this.viewDocEvent.bind(this);
    this.prepareStoreForEdit      = this.prepareStoreForEdit.bind(this);
    this.getSelectedDocForDelete  = this.getSelectedDocForDelete.bind(this);
  }

  componentWillMount() {
    this.props.documentActions.editDocSuccess();
    if (!window.localStorage.getItem('token')) {
      this.context.router.push('/');
    }
  }

  componentDidMount() {
    $(window).scroll(this.addMoreDocs);

    $(document).ready(function () {
      const sideNavDom = $('.button-collapse');
      $('.documents').addClass('current-menu');
      sideNavDom.sideNav();
      sideNavDom.sideNav('hide');
    });
  }

  componentWillUnmount() {
    $('.documents').removeClass('current-menu');
    $(window).unbind('scroll');
  }

  addMoreDocs() {
      const winObj = $(window);
      const docObj = $(document);
      const {lazyLoading, docs} = this.props.stateProp.userDocs;
      const {_id: userId} = this.props.stateProp.userState.userData;
      if (winObj.scrollTop() + winObj.height() === docObj.height()
        && !lazyLoading && docs.length > 9) {
          this
            .props
            .documentActions
            .addOwnedDocs(docs.length, userId);
      }
  }
    fabClick(event) {
      event.preventDefault();
      this.setState({
        docData: {
          title: '',
          content: '',
          access: []
        }
      });
      $('#createModal').openModal();
    }
  viewDocEvent(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.docs[id];
    selectedDocumentData.index = id;

    this.props.documentActions.prepareStoreForDocDetails(selectedDocumentData);
    $('#editDocModal').openModal();
  }

  getSelectedDocForDelete(event) {
    const {docs} = this.props.stateProp.userDocs;
    let docIndex = event.target.id;
    let selectedDocumentData = docs[docIndex];

    this.props.confirmDelete(selectedDocumentData);
  }

  prepareStoreForEdit(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.docs[id];

    $('#editDocModal').closeModal();
    this.context.router.push({
      pathname: '/docs/edit/owned/' + selectedDocumentData._id
    });
  }

  render() {
    const {
      userDocs: {
        docSuccess,
        deleteDoc,
        docs,
        lazyLoading,
        viewDoc
      },
      roles: {roles},
      userState: {userData}
    } = this.props.stateProp;

    return (
      <div className='row'>
        <div className='fab'>
          <a onClick={this.props.fabClick}
            className='btn-floating btn-large waves-effect waves-light'>
            <i className='material-icons'>add</i>
          </a>
        </div>        
        <DocumentForm
          docRoles={roles}
          changeHandler={this.props.onChangeHandler}
          CheckboxHandler={this.props.onClickCheckbox}
          submitAction={this.props.modalSubmitAction}
          tinymceEvent={this.props.OnchangeTinymce}
          showLoader={docSuccess}/>

        <div id='editDocModal' className='modal modal-fixed-footer'>
          <div className='modal-content'>
            <h4 className='custom-blue-text'>{viewDoc.title}</h4>
            <p dangerouslySetInnerHTML={{__html: viewDoc.content}}/>
          </div>
          <div className='modal-footer'>
            <span>Created by: <span className='username'>{viewDoc.creator.username}</span> | </span>
            <span className='grey-text'>{moment(viewDoc.createdAt).fromNow()}</span>
            <a className='close-delete-modal modal-action modal-close waves-effect waves-green btn-flat'>Close</a>
            <a id={viewDoc.index} onClick={this.prepareStoreForEdit}
              className='modal-action waves-effect btn-flat'>Edit</a>
          </div>
        </div>


        <div id='deleteDocModal' className='modal modal-fixed-footer'>
          <div className='modal-content'>
            <h4 className='custom-blue-text'>Are you sure you want to detele: {deleteDoc.title}?</h4>
          </div>
          <div className='modal-footer'>
            <a className='close-delete-modal modal-action modal-close waves-effect waves-green btn-flat'>No</a>
            <a onClick={this.props.deleteDoc}
              className='delete-doc-modal modal-action waves-effect waves-red btn-flat'>Yes</a>
          </div>
        </div>
      </div>
    );
  }
}

Documents.propTypes = {
  deleteDoc: PropTypes.func,
  onClickCheckbox: PropTypes.func,
  onChangeHandler: PropTypes.func,
  fabClick: PropTypes.func,
  OnchangeTinymce: PropTypes.func,
  confirmDelete: PropTypes.func,
  stateProp: PropTypes.object,
  documentActions: PropTypes.object,
  logoutEvent: PropTypes.func,
  modalSubmitAction: PropTypes.func
};

Documents.contextTypes = {
  router: PropTypes.object
};
  const mapDispatchToProps = (dispatch) => {
    return {
      documentActions: bindActionCreators(DocActions, dispatch),
      userActions: bindActionCreators(UserAction, dispatch),
      //searchActions: bindActionCreators(searchActions, dispatch),
      roleActions: bindActionCreators(RolesActions, dispatch)     
    };
  };

  const mapStateToProps = (state) => {
    console.log('mapped', state)
    return {
      stateProp: {
        userState: state.Users,
        userDocs: state.Doc,
        roles: state.Roles
      }
    };
  };

//export default connect(mapStateToProps, mapDispatchToProps)(Documents);
export default AppWrapper(Documents,'/docs');
