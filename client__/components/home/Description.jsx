import React from 'react';
/**
 * This represents the text found on the login/signup page
 * @return{ReactElement}
 */
const Description = () => {
  return (
    <div className='description-text'>
      <div className='main-text'>Welcome to Jaxdms.</div>
      <div className='supporting-text'>Jaxdms is a document management system,
        deisgned to manage your documents, and gives you control on who views
        your document. You can retrieve your documents anytime. To get started,
        just signup or signin if you have account already.
      </div>
    </div>
  );
};

export default Description;
