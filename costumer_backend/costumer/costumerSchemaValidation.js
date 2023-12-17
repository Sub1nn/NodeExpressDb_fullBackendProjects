import * as Yup from "yup";

export const CostumerSchemaValidator = Yup.object({
  name: Yup.string().required().trim().min(2).max(65),
  email: Yup.string().required().trim(),
  address: Yup.string().min(2).required().trim(),
  phoneNumber: Yup.number(),
});
