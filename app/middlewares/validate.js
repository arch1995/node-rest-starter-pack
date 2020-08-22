const Joi = require('@hapi/joi');
const httpStatus = require('http-status-codes');
const pick = require('@utils/pick');
const ApplicationError = require('@utils/applicationErrors');

const validate = schema => (req, _res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map(details => details.message)
      .join(', ');
    return next(
      new ApplicationError(httpStatus.EXPECTATION_FAILED, errorMessage),
    );
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
