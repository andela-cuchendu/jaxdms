const faker = require('faker');
const config = require('./config/config');

const newUrl = `${config.url}auth`;

const alias = faker.internet;
module.exports = {

  'User sign up without firstname': (browser) => {
    browser
      .url(newUrl)
      .waitForElementVisible('body', config.waitFor)
      .click('#sigin-toggle')
      .setValue('input[name=firstname]', '')
      .setValue('input[name=lastname]', 'paul')
      .setValue('input[name=email]', 'paul@pgba.com')
      .setValue('input[name=username]', 'paulpogba')
      .setValue('input[name=password]', 'password123')
      .setValue('input[name=confirmPassword]', 'password123')
      .click('button[name=sign-up]')
      .assert.containsText('#sigin-toggle', '')
      .assert.urlEquals(newUrl);
  },

  'User sign up with invalid email': (browser) => {
    browser
      .url(newUrl)
      .waitForElementVisible('body', config.waitFor)
      .click('#sigin-toggle')
      .setValue('input[name=firstname]', 'paul')
      .setValue('input[name=lastname]', 'pogba')
      .setValue('input[name=email]', 'paul')
      .setValue('input[name=username]', 'paulpogba')
      .setValue('input[name=password]', 'password123')
      .setValue('input[name=confirmPassword]', 'password123')
      .click('button[name=sign-up]')
      .useXpath()
      .assert.containsText('//*[@id="sign-up"]/div[2]/div[1]/span', 'Invalid email address')
      .useCss();
  },

  'User sign up with less password keys': (browser) => {
    browser
      .url(newUrl)
      .waitForElementVisible('body', config.waitFor)
      .click('#sigin-toggle')
      .setValue('input[name=firstname]', 'paul')
      .setValue('input[name=lastname]', 'pogba')
      .setValue('input[name=email]', 'paul@pogba.com')
      .setValue('input[name=username]', 'paulpogba')
      .setValue('input[name=password]', 'pass')
      .setValue('input[name=confirmPassword]', 'password123')
      .click('button[name=sign-up]')
      .useXpath()
      .assert.containsText('//*[@id="sign-up"]/div[3]/div[2]/span',
       'Password must have six or more characters')
      .useCss();
  },

  'User sign up with inconsistent password': (browser) => {
    browser
      .url(newUrl)
      .waitForElementVisible('body', config.waitFor)
      .click('#sigin-toggle')
      .setValue('input[name=firstname]', 'paul')
      .setValue('input[name=lastname]', 'pogba')
      .setValue('input[name=email]', 'paul@pogba.com')
      .setValue('input[name=username]', 'paulpogba')
      .setValue('input[name=password]', 'password123')
      .setValue('input[name=confirmPassword]', 'password')
      .click('button[name=sign-up]')
      .useXpath()
      .assert.containsText('//*[@id="sign-up"]/div[4]/div/span',
       'Password do not match')
      .useCss();
  },

  'User successfully signs up': (browser) => {
    browser
      .url(newUrl)
      .waitForElementVisible('body', config.waitFor)
      .click('#sigin-toggle')
      .setValue('input[name=firstname]', 'paul')
      .setValue('input[name=lastname]', 'pogba')
      .setValue('input[name=email]', alias.email())
      .setValue('input[name=firstname]', 'paul')
      .setValue('input[name=username]', alias.userName())
      .setValue('input[name=password]', 'password123')
      .setValue('input[name=lastname]', 'pogba')
      .setValue('input[name=confirmPassword]', 'password123')
      // .setValue('input[name=firstname]', 'paul')
      .click('button[name=sign-up]')
      .useXpath()
      .waitForElementVisible('//*[@id="search"]', config.waitFor)
      .assert.urlEquals(`${config.url}docs`)
      .useCss()
      .end();
  },
};