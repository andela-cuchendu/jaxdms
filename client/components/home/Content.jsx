import React, {PropTypes} from 'react';
import Description from './Description.jsx';
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';
/**
 * This represents the the signin/signup page
 * @param {function} toggleSignUp - function that toggles the 
 * signup and signin
 * @param {object} userActions - Object that represents the 
 * user actions
 * @param {object} stateProp - Object that represents the state
 * of the component.
 * @return {ReactElement} 
 */
const HomeContent = ({toggleSignUp, userActions, stateProp}) => {
  return (
    <div className='info-container'>
      <Description/>
      <div className='form-container'>
        <SignUp
          userActions={userActions}
          stateProp={stateProp}
          toggleSignUp={toggleSignUp}/>
        <SignIn
          userActions={userActions}
          stateProp={stateProp}
          toggleSignUp={toggleSignUp}/>
      </div>
    </div>
  );
};

HomeContent.propTypes = {
  userActions: PropTypes.object,
  stateProp: PropTypes.object,
  toggleSignUp: PropTypes.func
};

export default HomeContent;
