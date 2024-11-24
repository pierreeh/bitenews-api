const Joi = require("joi");

const authSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .trim(true)
    .max(256)
    .required(),
  password: Joi.string().min(6).max(1000).required(),
  username: Joi.string().max(100).trim(true).required(),
});

module.exports = authSchema;
