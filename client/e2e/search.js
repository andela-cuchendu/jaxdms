const config = require('./config/config');

const loginUrl = `${config.url}auth`;
const docUrl = `${config.url}auth`;
module.exports = {

  'User sign in success': (browser) => {
    browser
      .url(loginUrl)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[id=username-sigin]', 'admin')
      .setValue('input[id=password-signin]', 'password123')
      .click('button[name=sign-in]')
      .waitForElementVisible('input[type=search]', config.waitFor)
      .assert.urlEquals(`${config.url}docs`);
  },

  'search for a document': (browser) => {
    browser
      .url(docUrl)
      .waitForElementVisible('body', config.waitFor)
      .useXpath()
      .click('.//*[@id="search"]')
      .setValue('.//*[@id="search"]', 'a')
      .sendKeys('.//*[@id="search"]', browser.Keys.ENTER)
      .assert.containsText('//*[@id="app"]/div/div/div[2]/div[1]/div[2]/div/a',
      'Go Back')
      .useCss()
      .end();
  },
};
