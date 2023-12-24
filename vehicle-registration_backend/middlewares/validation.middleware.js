export const validateReqBody = (vehicleValidationSchema) => {
  const validateData = async (req, res, next) => {
    const data = req.body;
    try {
      await vehicleValidationSchema.validate(data);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
    next();
  };
  return validateData;
};
