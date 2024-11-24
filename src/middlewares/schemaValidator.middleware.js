const supportedMethods = ["post", "patch"];
const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

function schemaValidator(schema) {
  if (!schema) {
    throw new Error(`Schema not found for path: ${schema}`);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

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
