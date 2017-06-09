import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import DocumentForm from './DocumentForm';
import * as DocActions from '../actions/DocActions';
import * as RolesActions from '../actions/RolesActions';
import * as UserAction from '../actions/UserAction';
import {AppWrapper} from './Appwrapper';
import DocImage from '../images/auth.jpg';
import CardGroup from './common/cardDisplay';
import loader from './common/loader';


export class Documents extends Component {
  constructor() {
    super();

    this.addMoreDocs = this.addMoreDocs.bind(this);
    this.viewDocEvent = this.viewDocEvent.bind(this);
    this.prepareStoreForEdit = this.prepareStoreForEdit.bind(this);
    this.getSelectedDocForDelete = this.getSelectedDocForDelete.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
        let DocType = this.props.location.pathname.substring(1,5);
        if(DocType.includes('docs')){
          DocType = 'own';
        }
        console.log(DocType, 'mounting2')
      this.props.documentActions
          .getComponentResources(this.props.stateProp.userState.userData,DocType);    
    this.props.documentActions.editDocSuccess();
    if (!window.localStorage.getItem('token')) {
      this.context.router.push('/auth');
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
  goBack(){
    console.log('Props',this.props)
    this.context.router.push('/docs');
  }
  addMoreDocs() {
      const winObj = $(window);
      const docObj = $(document);
      const {lazyLoading, docs} = this.props.stateProp.userDocs;
      const {id: userId} = this.props.stateProp.userState.userData;
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
    console.log('confirm delete',this.props.deleteDoc)
    this.props.confirmDelete(selectedDocumentData);
  }

  prepareStoreForEdit(event) {
    console.log('prepare for edit', this.props.stateProp.userDocs.docs[id])
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.docs[id];

    $('#editDocModal').closeModal();
    this.context.router.push({
      pathname: '/docs/edit/' + selectedDocumentData.id
    });
  }

  render() {
    if(this.props.stateProp.userDocs.Deleted){
      Materialize.toast('Document updated', 4000);
      this.props.documentActions.DocumentDeletedHandled();
    }
    const {
      userDocs: {
        search,
        lazyLoading,
        deleteDoc,
        viewDoc
      },
      userState: {userData}
    } = this.props.stateProp;
    const {query: {q}} = this.props.location;
    const DidSearch = q == undefined ? false : true;
    let SearchHeader;  
    const Props = this.props.stateProp;
    const DocProps = {
      docSuccess: Props.userDocs.docSuccess,
      deleteDoc: Props.userDocs.deleteDoc,
      docs: Props.userDocs.docs,
      lazyLoading: Props.userDocs.lazyLoading,
      viewDoc: Props.userDocs.viewDoc,
      roles: Props.roles.roles,
      userData: Props.userState.userData
    };  
    if(DidSearch){
      DocProps.docs = search;
       SearchHeader=(
          <div className='header-class'>
            {`Found ${search.length} Result(s) for "${q}"`}
            <br/>
            <a onClick={this.goBack}>Go Back</a>
          </div>           
       )
       console.log('searched header',SearchHeader)
    }        
  let cards = '';
  if (DocProps.docs.length) {
    cards = DocProps.docs.map((eachDocs, index) => {
      const {id, title, UserId, creator, createdAt, content} = eachDocs;
      return (       
        <CardGroup
          key={id + parseInt(100*Math.random())}
          id={id}
          docIndex={index}
          cardType='own'
          cardCorver={DocImage}
          cardTitle={title}
          editCard={this.prepareStoreForEdit}
          cardCreator={creator}
          cardUserID={UserId}
          viewDoc={this.viewDocEvent}
          docDate={moment(createdAt).fromNow()}
          currentUserId={DocProps.userData.id}
          confirmDelete={this.getSelectedDocForDelete}
          cardContent={content}/>
      );
    });
  } else {
    cards = (
      <div className='center'>Sorry!!! No document found.</div>
    );
  }
    return (
      <div className='row docs'>
        <div className='content-container'>
          <div className='header-class'>
            Documents
          </div>
          <div className='header-class'>
               {SearchHeader}
          </div>           
          <div style={{clear: 'both', overflow: 'auto'}}>
            {cards}
          </div>
          <loader
            showLoader={DocProps.lazyLoading}/>
        </div>        
        <div className='fab'>
          <a onClick={this.props.fabClick}
            className='btn-floating btn-large waves-effect waves-light'>
            <i className='material-icons'>add</i>
          </a>
        </div>        
        <DocumentForm
          docRoles={DocProps.roles}
          changeHandler={this.props.onChangeHandler}
          CheckboxHandler={this.props.onClickCheckbox}
          submitAction={this.props.modalSubmitAction}
          tinymceEvent={this.props.OnchangeTinymce}
          showLoader={DocProps.docSuccess}
          userRole={DocProps.userData.role}/>

        <div id='editDocModal' className='modal modal-fixed-footer'>
          <div className='modal-content'>
            <h4 className='custom-blue-text'>{DocProps.viewDoc.title}</h4>
            <p dangerouslySetInnerHTML={{__html: DocProps.viewDoc.content}}/>
          </div>
          <div className='modal-footer'>
            <span>Created by: <span className='username'>{DocProps.viewDoc.creator}</span> | </span>
            <span className='grey-text'>{moment(DocProps.viewDoc.createdAt).fromNow()}</span>
            <a className='close-delete-modal modal-action modal-close waves-effect waves-green btn-flat'>Close</a>
            <a id={DocProps.viewDoc.index} onClick={this.prepareStoreForEdit}
              className='modal-action waves-effect btn-flat'>Edit</a>
          </div>
        </div>


        <div id='deleteDocModal' className='modal modal-fixed-footer'>
          <div className='modal-content'>
            <h4 className='custom-blue-text'>Are you sure you want to detele: {DocProps.deleteDoc.title}?</h4>
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
  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     documentActions: bindActionCreators(DocActions, dispatch),
  //     userActions: bindActionCreators(UserAction, dispatch),
  //     //searchActions: bindActionCreators(searchActions, dispatch),
  //     roleActions: bindActionCreators(RolesActions, dispatch)     
  //   };
  // };

  // const mapStateToProps = (state) => {
  //   console.log('mapped', state)
  //   return {
  //     stateProp: {
  //       userState: state.Users,
  //       userDocs: state.Doc,
  //       roles: state.Roles
  //     }
  //   };
  // };

//export default connect(mapStateToProps, mapDispatchToProps)(Documents);
export default AppWrapper(Documents,'/docs');
