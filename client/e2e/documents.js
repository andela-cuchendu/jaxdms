const faker = require('faker');
const config = require('./config/config');

const loginUrl = `${config.url}auth`;
const docUrl = `${config.url}auth`;
const content = faker.lorem;
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

  'User create doc': (browser) => {
    browser
      .url(docUrl)
      .waitForElementVisible('body', config.waitFor)
      .pause(2000)
      .useXpath()
      .click('//*[@id="app"]/div/div/div[2]/div[2]/a/i')
      .useCss()
      .setValue('input[name=title]', content.words())
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .pause(2000)
      .useXpath()
      .click('//*[@id="createModal"]/div[2]/button')
      .waitForElementVisible('//*[@id="toast-container"]/div', config.waitFor)
      .assert.containsText('//*[@id="toast-container"]/div',
      'Document Created successfully')
      .useCss();
  },

  'View Document': (browser) => {
    browser
      .url(docUrl)
      .pause(1000)
      .waitForElementVisible('body', config.waitFor)
      .click('.e2eview')
      .useXpath()
      .assert.containsText('//*[@id="editDocModal"]/div[2]/span[2]', '2017')
      .click('//*[@id="editDocModal"]/div[2]/a[1]')
      .useCss();
  },

  'Update Document': (browser) => {
    browser
      .url(docUrl)
      .waitForElementVisible('body', config.waitFor)
      .click('.e2eedit')
      .assert.urlContains('edit')
      .click('.mce-i-code')
      .clearValue('.mce-textbox')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .pause(2000)
      .useXpath()
      .click('//*[@id="app"]/div/div/div[2]/div/div[2]/form/button')
      .waitForElementVisible('//*[@id="toast-container"]/div', config.waitFor)
      .assert.containsText('//*[@id="toast-container"]/div', 'Document updated')
      .useCss();
  },

  'Delete Document': (browser) => {
    browser
      .url(docUrl)
      .waitForElementVisible('body', config.waitFor)
      .click('.e2edelete')
      .useXpath()
      .pause(1000)
      .click('//*[@id="deleteDocModal"]/div[2]/a[2]')
      .waitForElementVisible('//*[@id="toast-container"]/div', config.waitFor)
      .assert.containsText('//*[@id="toast-container"]/div', 'Document deleted')
      .end();
  },
};
