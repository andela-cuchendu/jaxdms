require('babel-register')();
process.env.NODE_ENV = 'TEST';
require.extensions['.css'] = function () {return null;};
require.extensions['.png'] = function () {return null;};
require.extensions['.jpg'] = function () {return null;};
var jsdom = require('jsdom').jsdom,
  $ = require('jquery')(jsdom('').defaultView),
  jQuery = $;
var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
global.window.tinymce = {init: () => {}};
global.window.$ = $;
global.window.jQuery = jQuery;
global.window.$.fn.material_select = () => {return this};
global.window.$.fn.sideNav = () => {return this};
global.window.context = {
  router: {
    push: function () {
      return;
    }
  }
}

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document; 
