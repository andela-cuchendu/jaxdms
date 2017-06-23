import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import DocumentForm from './DocumentForm.jsx';
import { AppWrapper } from './AppWrapper.jsx';
import DocImage from '../images/auth.jpg';
import DocDisplay from './common/DocDisplay.jsx';
import Spinner from './common/Spinner.jsx';

/**
 * Represents a document
 *
 * @class Documents
 * @extends {Component}
 */
export class Documents extends Component {
  /**
   * Creates an instance of Documents.
   *
   * @memberOf Documents
   */
  constructor() {
    super();
    this.state = {
      current: 1,
    };
    this.viewDocEvent = this.viewDocEvent.bind(this);
    this.prepareStoreForEdit = this.prepareStoreForEdit.bind(this);
    this.getSelectedDocForDelete = this.getSelectedDocForDelete.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onPagination = this.onPagination.bind(this);
  }

  /**
   * componentWillMount
   *
   *
   * @memberOf Documents
   */
  componentWillMount() {
    let DocType = this.props.location.pathname.substring(1, 5);
    if (DocType.includes('docs')) {
      DocType = 'own';
    }
    this.props.documentActions
      .getComponentResources(this.props.stateProp.userState.userInfo,
      DocType, 0, 9);
  }

  /**
   * componentDidMount
   *
   * @memberOf Documents
   */
  componentDidMount() {
    this.props.documentActions.editDocSuccess();
    $(document).ready(function () {
      const sideNavDom = $('.button-collapse');
      $('.documents').addClass('current-menu');
      sideNavDom.sideNav();
      sideNavDom.sideNav('hide');
    });
  }

  /**
   * componentWillUnmount
   *
   *
   * @memberOf Documents
   */
  componentWillUnmount() {
    $('.documents').removeClass('current-menu');
  }
  /**
   * -Used for pagination
   *
   * @param {number} page
   *
   * @memberOf Documents
   */
  onChange(page) {
    this.setState({
      current: page,
    });
    let DocType = this.props.location.pathname.substring(1, 5);
    if (DocType.includes('docs')) {
      DocType = 'own';
    }
    this.props.documentActions
      .getComponentResources(this.props.stateProp.userState.userInfo,
      DocType, (page * 9) - 9, 9);
  }
  onPagination(total, range) {
    let pageSummary;
    pageSummary = `${range[0]} - ${range[1]} of ${total} items`;
    if (range[0] > total) {
      pageSummary = `1 - ${range[1]} of ${total} items`;
    }
    return pageSummary;
  }
  /**
   * getSelectedDocForDelete - Gets the data
   * of the document to be deleted
   *
   * @param {any} event
   *
   * @memberOf Documents
   */
  getSelectedDocForDelete(event) {
    const { docs } = this.props.stateProp.userDocs;
    const docIndex = event.target.id;
    const selectedDocumentData = docs[docIndex];
    this.props.confirmDelete(selectedDocumentData);
  }

  /**
   * goBack -Pushes back to document
   * page after a search result
   *
   * @memberOf Documents
   */
  goBack() {
    this.context.router.push('/docs');
  }

  /**
   * prepareStoreForEdit
   *
   * @param {any} event
   *
   * @memberOf Documents
   *
   * Called when document is about to be edited.
   */
  prepareStoreForEdit(event) {
    const { id } = event.target;
    const selectedDocumentData = this.props.stateProp.userDocs.docs[id];

    $('#editDocModal').closeModal();
    this.context.router.push({
      pathname: `/docs/edit/'${selectedDocumentData.id}`,
    });
  }

  /**
   * viewDocEvent - Event that handles document viewing
   *
   * @param {any} event
   *
   * @memberOf Documents
   */
  viewDocEvent(event) {
    const { id } = event.target;
    const selectedDocumentData = this.props.stateProp.userDocs.docs[id];
    selectedDocumentData.index = id;

    this.props.documentActions.prepareStoreForDocDetails(selectedDocumentData);
    $('#editDocModal').openModal();
  }

  render() {
    if (this.props.stateProp.userDocs.Deleted) {
      Materialize.toast('Document deleted', 4000);
      this.props.documentActions.DocumentDeletedHandled();
    }
    const {
      userDocs: {
        search,
      },
    } = this.props.stateProp;
    const { query: { q } } = this.props.location;
    const DidSearch = q === undefined ? false : true;
    let SearchHeader;
    const Props = this.props.stateProp;
    const DocProps = {
      docSuccess: Props.userDocs.docSuccess,
      deleteDoc: Props.userDocs.deleteDoc,
      docs: Props.userDocs.docs,
      lazyLoading: Props.userDocs.lazyLoading,
      viewDoc: Props.userDocs.viewDoc,
      roles: Props.roles.roles,
      userInfo: Props.userState.userInfo,
    };
    let total = this.props.stateProp.userDocs.docCount;
    if (DidSearch) {
      DocProps.docs = search;
      SearchHeader = (
        <div className="header-class">
          {`Found ${search.length} Result(s) for "${q}"`}
          <br />
          <a onClick={this.goBack}>Go Back</a>
        </div>
       );
      total = 0;
    }
    let cards = '';
    if (DocProps.docs.length) {
      cards = DocProps.docs.map((eachDocs, index) => {
        const { id, title, UserId, creator, createdAt, content } = eachDocs;
        return (
          <DocDisplay
            key={id + (100 * Math.random())}
            id={id}
            docIndex={index}
            cardType="own"
            cardCorver={DocImage}
            cardTitle={title}
            editCard={this.prepareStoreForEdit}
            cardCreator={creator}
            cardUserID={UserId}
            viewDoc={this.viewDocEvent}
            docDate={moment(createdAt).format('MMMM Do YYYY')}
            currentUserId={DocProps.userInfo.id}
            confirmDelete={this.getSelectedDocForDelete}
            cardContent={content}
          />
        );
      });
    } else {
      cards = (
        <div className="center">Sorry!!! No document found.</div>
      );
    }

    return (
      <div className="row docs">
        <div className="content-container">
          <div className="header-class">
            Documents
          </div>
          <div className="header-class">
            {SearchHeader}
          </div>
          <div style={{ clear: 'both', overflow: 'auto' }}>
            {cards}
          </div>
          <Pagination
            showTotal={this.onPagination}
            onChange={this.onChange}
            current={this.state.current}
            pageSize={9}
            total={total}
          />
          <Spinner
            showLoader={!DocProps.lazyLoading}
          />
        </div>
        <div className="plus">
          <a
            onClick={this.props.plusClick}
            className="btn-floating btn-large waves-effect waves-light"
          >
            <i className="material-icons">add</i>
          </a>
        </div>
        <DocumentForm
          docRoles={DocProps.roles}
          changeEvent={this.props.onChangeEvent}
          submitAction={this.props.modalSubmitAction}
          tinymceEvent={this.props.OnchangeTinymce}
          showLoader={DocProps.docSuccess}
          userRole={DocProps.userInfo.role}
        />
        <div id="editDocModal" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4 className="custom-blue-text">{DocProps.viewDoc.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: DocProps.viewDoc.content }} />
          </div>
          <div className="modal-footer">
            <span>Created by: <span className="username">
              {DocProps.viewDoc.creator}</span> | </span>
            <span
              className="grey-text"
            >
              {moment(DocProps.viewDoc.createdAt).format('MMMM Do YYYY')}
            </span>
            <a
              className="close-delete-modal modal-action modal-close
              waves-effect waves-green btn-flat"
            >
              Close
            </a>
            {DocProps.viewDoc.UserId === DocProps.userInfo.id ?
              <a
                id={DocProps.viewDoc.index} onClick={this.prepareStoreForEdit}
                className="modal-action waves-effect btn-flat"
              >
                Edit
              </a>
            : ''
            }
          </div>
        </div>
        <div id="deleteDocModal" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4 className="custom-blue-text">
              Are you sure you want to detele: {DocProps.deleteDoc.title}?</h4>
          </div>
          <div className="modal-footer">
            <a
              className="close-delete-modal modal-action modal-close waves-effect
            waves-green btn-flat"
            >
              No
            </a>
            <a
              onClick={this.props.deleteDoc}
              className="delete-doc-modal modal-action waves-effect waves-red btn-flat"
            >
              Yes
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Documents.propTypes = {
  deleteDoc: PropTypes.func,
  onChangeEvent: PropTypes.func,
  plusClick: PropTypes.func,
  OnchangeTinymce: PropTypes.func,
  confirmDelete: PropTypes.func,
  stateProp: PropTypes.object,
  documentActions: PropTypes.object,
  logoutEvent: PropTypes.func,
  modalSubmitAction: PropTypes.func,
};

Documents.contextTypes = {
  router: PropTypes.object,
};

export default AppWrapper(Documents);
