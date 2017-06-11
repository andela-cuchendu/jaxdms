import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const UsersCard = ({
      id,
    docIndex,
    cardType,
    user,
    userDate,
    confirmDelete
}) => {
    let deleteButton = (
      <i id={docIndex}
        onClick={confirmDelete}
         className='material-icons delete-color modal-trigger custom-icon'>
        delete
      </i>
    );
  
return(
    <div key={id} className='card hoverable document-cards'>
      <div className='card-content custom-doc-card'>
        <span className='card-title zapper truncate custom-blue-text '>
          {user.username}
        </span>
        <p>
          <br/>
          <span className='grey-text'>Firstname:{user.firstname}</span>
          <br/>
          <span className='grey-text'>Lastname:{user.lastname}</span>
          <br/>
          <span className='grey-text'>Email:{user.email}</span>
          <br/>
          <span className='grey-text'>Created :{userDate}</span>                    
        </p>
      </div>
      <div className='card-action action-card-custom'>
        {deleteButton}
          <Link to={`/users/edit/${id}`}>
          <i className='material-icons modal-trigger custom-icon'>
            edit
          </i>
        </Link>
      </div>
    </div>
);
};

UsersCard.propTypes = {
  id: PropTypes.number
};

export default UsersCard;
