const dotenv = require('dotenv');
const path = require('path');
const Joi = require('@hapi/joi');

// Load environment variables from .env file.
dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVariablesSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development')
      .default('development'),
    PORT: Joi.number().default(8080),
    MONGODB_URL: Joi.string().required(),
    MONGO_CONNECT_TIMEOUT: Joi.number().default(2000), // in milliseconds.
  })
  .unknown();

const { value: configVars, error } = envVariablesSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: configVars.PORT,
  env: configVars.NODE_ENV,
  mongo: {
    uri: configVars.MONGODB_URL,
    options: {
      // we don't want indexes to be created every time when we reload in production environment.
      useCreateIndex: configVars.NODE_ENV === 'development' ? true : false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    retryTimeout: configVars.MONGO_CONNECT_TIMEOUT,
  },
};
