import * as Yup from "yup";

export const laptopSchemaValidator = Yup.object({
  name: Yup.string()
    .required()
    .trim()
    .min(2, "name must be 2 characters long")
    .max(55, "name must not exceed 55 characters"),
  brand: Yup.string().required().trim(),
  processor: Yup.string().required().trim(),
  ram: Yup.string().required().trim(),
  ssd: Yup.number().required().min(1, "ssd must be at least 1GB"),
  price: Yup.number().required().min(15000, "minimum price must be 15000"),
});
