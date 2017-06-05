import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RolesActions from '../actions/RolesActions';
import * as UserActions from '../actions/UserAction';
import * as DocActions from '../actions/DocActions';
import * as SearchActions from '../actions/SearchAction';
import Header from './common/Header';
import Footer from './common/Footer';

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
    }

    componentWillMount() {

      if (window.localStorage.getItem('token')) {
      this.props.documentActions
          .getComponentResources(this.props.stateProp.userState.userData);
          if(path === '/' || path === '/auth'){
            this.context.router.push('/docs');
          }
      } else {
          if(!(path === '/' || path === '/auth')){
            this.context.router.push('/auth');
          }        
      }
    }



    searchDoc(event) {
      let searchValue = event.target.value;
      const {role: {_id: roleId}} = this.props.stateProp.userState.userData;

      if (event.key === 'Enter') {
        this.props.searchActions.searchDocument(searchValue, roleId);
        this.context.router.push({
          pathname: '/search',
          query: {
            q: searchValue
          }
        });
      }
    }

    logout(event) {
      event.preventDefault();
      this.props.stateProp.userState.userData = {};
      window.localStorage.removeItem('token');
      this.context.router.push('/auth');
    }

    deleteDoc(event) {
      event.preventDefault();
      const {_id: docId} = this.props.stateProp.userDocs.deleteDoc;

      this.props.documentActions.deleteDocAction(docId);
      $('#deleteDocModal').closeModal();
    }

    onChangeHandler(event) {
      event.preventDefault();
      const {name, value} = event.target;
      this.state.docData[name] = value;
    }

    confirmDelete(selectedDocumentData) {
      this.props.documentActions.createModalData(selectedDocumentData);
      $('#deleteDocModal').openModal();
    }

    OnchangeTinymce(event) {
      const value = event.target.getContent();
      this.state.docData.content = value;
    }

    modalSubmitAction(event) {
      event.preventDefault();
      const {docData} = this.state;
      const {_id, username} = this.props.stateProp.userState.userData;
      const creatorData = {_id, username}

      docData.access = docData.access.toString();
      this.setState({
        docData: {
          title: '',
          content: '',
          access: []
        }
      });

      this.props.documentActions.createDoc(docData, creatorData);
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
      console.log('wrapper status', status);
      console.log('wrapper length', Object.keys(User).length);
      console.log('wrapper status object', User);
      return (
        <div>
        <Header 
          LogoutEvent={this.logout}
          UserStatus ={status}
          searchEvent={this.searchDoc}
         User={User} />
        <ChildComponent
          deleteDoc={this.deleteDoc}
          onChangeHandler={this.onChangeHandler}
          confirmDelete={this.confirmDelete}
          OnchangeTinymce={this.OnchangeTinymce}
          modalSubmitAction={this.modalSubmitAction}
          onClickCheckbox={this.onClickCheckBox}
          fabClick={this.fabClick}
          {...this.props}/>
          <Footer/>
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
