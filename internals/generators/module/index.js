/**
 * Module Generator
 */

// const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'create a new api',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Api',
      validate: value => {
        if (/.+/.test(value)) {
          return true;
          // return componentExists(value)
          //   ? 'A component or container with this name already exists'
          //   : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'version',
      message: 'what is the version of this api?',
      default: 'v1',
      validate: value => {
        if (/.+/.test(value)) {
          return true;
          // return componentExists(value)
          //   ? 'A component or container with this name already exists'
          //   : true;
        }

        return 'API version is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantMiddleware',
      default: false,
      message: 'Do you want to add middleware for this api?',
    },
    {
      type: 'confirm',
      name: 'wantValidation',
      default: true,
      message: 'Do you want validate your routes using Joi?',
    },
  ],
  actions: data => {
    // Generate index.js.
    const actions = [
      {
        type: 'add',
        path: '../../app/controllers/{{camelCase name}}/index.js',
        templateFile: './module/controller.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/routes/{{ version }}/{{camelCase name}}/index.js',
        templateFile: './module/router.js.hbs',
        abortOnFail: true,
      },
    ];

    // If api wants middleware
    if (data.wantMiddleware) {
      actions.push({
        type: 'add',
        path: '../../app/middlewares/{{camelCase name}}.js',
        templateFile: './module/middleware.js.hbs',
        abortOnFail: true,
      });
    }

    // If api wants middleware
    if (data.wantValidation) {
      actions.push({
        type: 'add',
        path: '../../app/validations/{{camelCase name}}.js',
        templateFile: './module/validator.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/controllers/',
    });

    actions.push({
      type: 'prettify',
      path: '/routes/{{ version }}',
    });

    return actions;
  },
};
