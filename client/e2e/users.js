const config = require('./config/config');
const faker = require('faker');

const loginUrl = `${config.url}auth`;
const userUrl = `${config.url}users`;
const alias = faker.internet;
const user = faker.name;
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

  'Delete user': (browser) => {
    browser
      .url(userUrl)
      .click('.e2edeleteu')
      .useXpath()
      .pause(1000)
      .click('//*[@id="deleteDocModal"]/div[2]/a[2]')
      .waitForElementVisible('//*[@id="toast-container"]/div', config.waitFor)
      .assert.containsText('//*[@id="toast-container"]/div', 'Account successfully deleted');
  },

  'Edit User': (browser) => {
    browser
      .url(userUrl)
      .useXpath()
      .click('//*[@id="app"]/div/div/div[2]/div[1]/div[3]/div[1]/div[2]/a/i')
      .assert.urlContains('edit')
      .setValue('//*[@id="firstname"]', user.firstName())
      .setValue('//*[@id="lastname"]', user.lastName())
      .click('//*[@id="app"]/div/div/div[2]/div/div[2]/form/button')
      .waitForElementVisible('//*[@id="toast-container"]/div', config.waitFor)
      .assert.containsText('//*[@id="toast-container"]/div', 'User updated')
      .end();
  },

  'Admin create user': (client) => {
    client
      .url(loginUrl)
      .useCss()
      .setValue('input[id=username-sigin]', 'admin')
      .setValue('input[id=password-signin]', 'password123')
      .click('button[name=sign-in]')
      .url(userUrl)
      .waitForElementVisible('body', config.waitFor)
      .pause(2000)
      .useXpath()
      .click('//*[@id="app"]/div/div/div[2]/div[2]/a/i')
      .useCss()
      .setValue('input[name=firstname]', 'paul')
      .setValue('input[name=lastname]', 'pogba')
      .setValue('input[name=email]', alias.email())
      .setValue('input[name=firstname]', 'paul')
      .setValue('input[name=username]', alias.userName())
      .setValue('input[name=password]', 'password123')
      .setValue('input[name=lastname]', 'pogba')
      .setValue('input[name=confirmPassword]', 'password123')
      .useXpath()
      .click('//*[@id="sign-up"]/button')
      .waitForElementVisible('//*[@id="toast-container"]/div', config.waitFor)
      .assert.containsText('//*[@id="toast-container"]/div',
      'Account successfully created')
      .end();
  },
};
