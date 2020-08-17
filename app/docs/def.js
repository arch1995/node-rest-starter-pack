/**
 * Contains info about swagger-jsdoc definition.
 */
const { version } = require('@root/package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'REST API Documentation',
    version,
    license: {
      name: 'MIT',
      url: '',
    },
  },
  // add all your staging/development/production server configs here.
  servers: [
    {
      url: `http://localhost:${config.port}/{version}`,
      description: 'Local development server',
      variables: {
        version: {
          default: 'v1',
          type: 'string',
          description: 'api version key',
          enum: ['v1'],
        },
      },
    },
  ],
};

export default swaggerDef;
