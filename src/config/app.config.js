const dotenv = require('dotenv');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
const GLOBAL_PATH = process.cwd();

// if there is no node_env set then node environment is production.
if (!Boolean(NODE_ENV)) {
  NODE_ENV = 'production';
}

// Load environment variables from .env file.
// create separate env file for different type of build environments.
dotenv.config({ path: path.join(GLOBAL_PATH, '.env') });

// TODO: Add suport for @hapi/Joi for environments variable validation.
const envVars = {
  PORT: parseInt(process.env.PORT, 10),
};

module.exports = {
  port: envVars.PORT,
  env: NODE_ENV,
  basePath: GLOBAL_PATH,
};
