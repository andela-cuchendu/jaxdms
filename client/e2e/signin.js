const config = require('./config/config');

const newUrl = `${config.url}auth`;
module.exports = {

  'User sign in without credentials': (browser) => {
    browser
      .url(newUrl)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[id=username-sigin]', '')
      .setValue('input[id=password-signin]', '')
      .click('button[name=sign-in]')
      .assert.containsText('#sigin-toggle', '')
      .assert.urlEquals(newUrl);
  },

  'User sign in with wrong credentials': (browser) => {
    browser
      .url(newUrl)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[id=username-sigin]', 'kjhdkjhdkjgd')
      .setValue('input[id=password-signin]', 'nothingpassword')
      .click('button[name=sign-in]')
      .assert.containsText('.signinform', 'Authentication failed. Invalid login.');
  },

  'User sign in success': (browser) => {
    browser
      .url(newUrl)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[id=username-sigin]', 'admin')
      .setValue('input[id=password-signin]', 'password123')
      .click('button[name=sign-in]')
      .waitForElementVisible('input[type=search]', config.waitFor)
      .assert.urlEquals(`${config.url}docs`)
      .end();
  },

};
