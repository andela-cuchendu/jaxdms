import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * Represents the User card
 * @param {object} - Object passed as props
 * used in building this card
 * @return {htmlElements} - Html Element
 * representing this card
 */
const UsersCard = ({
  id,
  docIndex,
  user,
  userDate,
  confirmDelete,
}) => {
  const deleteButton = (
    <i
      id={docIndex}
      onClick={confirmDelete}
      className="material-icons delete-color modal-trigger custom-icon"
    >
    delete
    </i>
  );
  return (
    <div key={id} className="card hoverable document-cards">
      <div className="card-content custom-doc-card">
        <span className="card-title zapper truncate custom-blue-text ">
          {user.username}
        </span>
        <p>
          <br />
          <span className="grey-text">Firstname:{user.firstname}</span>
          <br />
          <span className="grey-text">Lastname:{user.lastname}</span>
          <br />
          <span className="grey-text">Email:{user.email}</span>
          <br />
          <span className="grey-text">Created :{userDate}</span>
        </p>
      </div>
      <div className="card-action action-card-custom">
        {deleteButton}
        <Link to={`/users/edit/${id}`}>
          <i className="material-icons modal-trigger custom-icon">
            edit
          </i>
        </Link>
      </div>
    </div>
  );
};

UsersCard.propTypes = {
  id: PropTypes.number,
  docIndex: PropTypes.number,
  user: PropTypes.object,
  userDate: PropTypes.string,
  confirmDelete: PropTypes.function,
};

export default UsersCard;
