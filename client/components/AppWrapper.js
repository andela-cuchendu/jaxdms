import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RolesActions from '../actions/RolesActions';
import * as UserActions from '../actions/UserAction';
import * as DocActions from '../actions/DocActions';
import * as SearchActions from '../actions/SearchAction';
import SideBar from './SideBar.js';
import Header from './common/Header';

export const AppWrapper = (ChildComponent,path) => {
  class AppContainer extends Component {
    constructor() {
      super();
      this.state = {
        docData: {
          title: '',
          content: '',
          access: []
        },
        searchTerm: ''
      };
      

      this.logout             = this.logout.bind(this);
      this.fabClick           = this.fabClick.bind(this);
      this.searchDoc          = this.searchDoc.bind(this);
      this.deleteDoc          = this.deleteDoc.bind(this);
      this.confirmDelete      = this.confirmDelete.bind(this);
      this.OnchangeTinymce    = this.OnchangeTinymce.bind(this);
      this.onChangeHandler    = this.onChangeHandler.bind(this);
      this.onClickCheckBox    = this.onClickCheckBox.bind(this);
      this.modalSubmitAction  = this.modalSubmitAction.bind(this);
      this.SharedClick = this.SharedClick.bind(this);
      this.RoleClick  = this.RoleClick.bind(this);
      this.DocClick  = this.DocClick.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
    }

    componentWillMount() {

      if (window.localStorage.getItem('token')) {
        let DocType = this.props.location.pathname.substring(1,5);
        if(DocType.includes('docs')){
          DocType = 'own';
        }
      this.props.documentActions
          .getComponentResources(this.props.stateProp.userState.userData,DocType);        
      }else {
        this.context.router.push('/auth');
      }
    }
    componentWillReceiveProps(nextProps) {
      const {docSuccess} = this.props.stateProp.userDocs;
      const {userSuccess} = this.props.stateProp.userState.userCreated;
      if (userSuccess) $('#createModal').closeModal();
      if (!docSuccess) $('#createModal').closeModal();

      if (nextProps.stateProp.userDocs.redirect) {
        this.context.router.push('/auth');
      }
    }
    SharedClick (){
      this.props.documentActions
          .getComponentResources(this.props.stateProp.userState.userData,'shar'); 
          this.context.router.push('/shar');
    }
    RoleClick (){
      this.props.documentActions
          .getComponentResources(this.props.stateProp.userState.userData,'role'); 
          this.context.router.push('/role');
    }
    DocClick (){
      this.props.documentActions
          .getComponentResources(this.props.stateProp.userState.userData,'own'); 
          this.context.router.push('/docs');
    }        

    searchDoc(event) {
      console.log('in search')
      let searchValue = event.target.value;
      const roleId = this.props.stateProp.userState.userData.role;

      if (event.key === 'Enter') {
        console.log('search any' ,roleId)
        this.props.searchActions.searchDocument(searchValue, roleId);
        this.context.router.push({
          pathname: '/docs',
          query: {
            q: searchValue
          }
        });
      }
    }

    logout(event) {
      event.preventDefault();
      window.localStorage.removeItem('token');
      window.localStorage.clear()
      window.location.reload();
      this.context.router.push('/auth');
    }

    deleteDoc(event) {
      event.preventDefault();
      const {id: docId} = this.props.stateProp.userDocs.deleteDoc;
      console.log('deletedoc', docId)
      this.props.documentActions.deleteDocAction(docId);
      $('#deleteDocModal').closeModal();
    }
    deleteUser(event) {
      event.preventDefault();
      const userId = this.props.stateProp.userState.deleteUser.id;
      console.log('deleteUser', userId)
      this.props.userActions.deleteUserAction(userId);
      $('#deleteDocModal').closeModal();
    }    

    onChangeHandler(event) {
      event.preventDefault();
      const {name, value} = event.target;
      this.state.docData[name] = value;
    }

    confirmDelete(selectedDocumentData, user) {
      console.log('User please',this.props)
      if(user != undefined) {
        this.props.userActions.createModalData(selectedDocumentData);
      } else {
        this.props.documentActions.createModalData(selectedDocumentData);
      }
      
      $('#deleteDocModal').openModal();
    }

    OnchangeTinymce(event) {
      const value = event.target.getContent();
      this.state.docData.content = value;
    }

    modalSubmitAction(event) {
      event.preventDefault();
      const {docData} = this.state;
      const username = this.props.stateProp.userState.userData.username;

      docData.access = docData.access.toString();
      this.setState({
        docData: {
          title: '',
          content: '',
          access: []
        }
      });

      this.props.documentActions.createDoc(docData, username);
      event.currentTarget.reset();
    }


    onClickCheckBox(event) {
      const value = event.target.value;
      const {access} = this.state.docData;

      if (access.indexOf(value) < 0) {
        access.push(value);
        return this.state.docData.access = access;
      }

      access.splice(access.indexOf(value), 1);
      this.state.docData.access = access;
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
    
    render() {
      let User = this.props.stateProp.userState.userData;   
      status = (Object.keys(User).length > 0);
      return (
        <div>
        <Header 
          LogoutEvent={this.logout}
          UserStatus ={status}
          SearchEvent={this.searchDoc}
         User={User} />
        <SideBar 
        userData={User}
        SharedClick={this.SharedClick}
        RoleClick={this.RoleClick}
        DocClick={this.DocClick}
        logout={this.logout}/>
        <ChildComponent
          deleteDoc={this.deleteDoc}
          onChangeHandler={this.onChangeHandler}
          confirmDelete={this.confirmDelete}
          OnchangeTinymce={this.OnchangeTinymce}
          modalSubmitAction={this.modalSubmitAction}
          onClickCheckbox={this.onClickCheckBox}
          fabClick={this.fabClick}
          deleteUser={this.deleteUser}
          {...this.props}/>
          </div>
      );
    }
  }

  AppContainer.contextTypes = {
    router: PropTypes.object
  };

  AppContainer.propTypes = {
    stateProp: PropTypes.object.isRequired,
    documentActions: PropTypes.object.isRequired
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      documentActions: bindActionCreators(DocActions, dispatch),
      userActions: bindActionCreators(UserActions, dispatch),
      searchActions: bindActionCreators(SearchActions, dispatch),
      roleActions: bindActionCreators(RolesActions, dispatch)
    };
  };

  const mapStateToProps = (state) => {
    return {
      stateProp: {
        userState: state.Users,
        userDocs: state.Doc,
        roles: state.Roles
      }
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(AppContainer);
};
