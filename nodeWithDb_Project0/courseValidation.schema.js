import * as Yup from "yup";

export const courseValidationSchema = Yup.object({
  name: Yup.string()
    .required()
    .trim()
    .min(1, "name must contain at least a character")
    .max(55, "name must not be more than 55 chars long"),
  price: Yup.number().required().min(1, "price must be at least a dollar"),
  duration: Yup.number().required().min(1, "duration must be at least a day"),
});
