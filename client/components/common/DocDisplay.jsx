import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * Represent a material design card
 * @param {object0} -Object used in
 * building this card.
 * @return {htmlTags} - returs html
 * tags for this card
 */
const DocDisplay = ({
  id,
  viewDoc,
  cardCorver,
  cardTitle,
  cardCreator,
  cardUserID,
  docDate,
  confirmDelete,
  docIndex,
  currentUserId,
  cardContent,
  RoleID,
}) => {
  let deleteButton;
  if (cardUserID === currentUserId || RoleID === 3) {
    deleteButton = (
      <i
        id={docIndex}
        onClick={confirmDelete}
        className="material-icons delete-color modal-trigger custom-icon e2edelete"
      >
        delete
      </i>
    );
  }

  return (
    <div key={id} className="card hoverable document-cards">
      <div className="card-image waves-effect waves-block waves-light">
        <img alt="" className="zapper" src={cardCorver} />
      </div>
      <div className="card-content custom-doc-card">
        <span className="card-title zapper truncate custom-blue-text ">
          {cardTitle}
        </span>
        <p>
          <span>Created by: <span className="username">{cardCreator}</span></span>
          <br />
          <span className="grey-text">{docDate}</span>
        </p>
      </div>
      <div className="card-action action-card-custom">
        {deleteButton}
        {cardUserID === currentUserId ?
          <Link to={`/docs/edit/${id}`}>
            <i className="material-icons modal-trigger custom-icon e2eedit">
            edit
          </i>
          </Link>
        : ''
        }
        <i
          id={docIndex}
          onClick={viewDoc}
          className="material-icons modal-trigger custom-icon right e2eview"
        >
          open_in_new
        </i>
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">{cardTitle}
          <i className="material-icons right">close</i>
        </span>
        <p dangerouslySetInnerHTML={{ __html: cardContent }} />
      </div>
    </div>
  );
};
DocDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  docDate: PropTypes.string.isRequired,
  cardCorver: PropTypes.string.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  docIndex: PropTypes.number.isRequired,
  currentUserId: PropTypes.number.isRequired,
  cardTitle: PropTypes.string.isRequired,
  cardCreator: PropTypes.string.isRequired,
  cardContent: PropTypes.string.isRequired,
  viewDoc: PropTypes.string.isRequired,
  RoleID: PropTypes.number.isRequired,
  cardUserID: PropTypes.number.isRequired,
};

export default DocDisplay;
