'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/alias-model-in-controller');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('alias-model-in-controller', rule, {
  valid: [
    {
      code: 'export default Ember.Controller.extend({nail: alias("model")});',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
    },
    {
      code: 'export default Ember.Controller.extend({nail: computed.alias("model")});',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
    },
    {
      code: 'export default Ember.Controller.extend({nail: Ember.computed.alias("model")});',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
    }
  ],
  invalid: [
    {
      code: 'export default Ember.Controller.extend({});',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
      errors: [{
        message: 'Alias your model',
      }],
    },
    {
      code: 'export default Ember.Controller.extend({resetPassword: service()});',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
      errors: [{
        message: 'Alias your model',
      }],
    },
    {
      code: 'export default Ember.Controller.extend({resetPassword: inject.service()});',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
      errors: [{
        message: 'Alias your model',
      }],
    },
    {
      code: 'export default Ember.Controller.extend({resetPassword: Ember.inject.service()});',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
      errors: [{
        message: 'Alias your model',
      }],
    }
  ]
});