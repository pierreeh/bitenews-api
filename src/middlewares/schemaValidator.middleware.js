const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

function schemaValidator(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, validationOptions);

    if (error) {
      const payload = {
        status: "error",
        message: error.details.map(({ message }) =>
          message.replace(/['"]/g, "")
        ),
      };

      return res.status(400).json(payload);
    }

    req.body = value;
    return next();
  };
}

module.exports = schemaValidator;
