import * as Yup from "yup";

export const userDataSchemaValidation = Yup.object({
  firstName: Yup.string()
    .required()
    .trim()
    .max(55, "name must not exceed 55 characters"),
  lastName: Yup.string()
    .required()
    .trim()
    .max(65, "name must not exceed 55 characters"),
  email: Yup.string()
    .trim()
    .required()
    .lowercase()
    .max(70, "email must be at most 70 characters"),
  password: Yup.string()
    .required()
    .min(4, "password must contain at least 4 characters")
    .max(25, "password must not exceed 25 characters"),
  gender: Yup.string().trim().oneOf(["male", "female", "preferNotToSay"]),
  avatar: Yup.string().required(),
});

export const userEmailSchemaValidation = Yup.string()
  .email("Must be a valid email address")
  .trim()
  .lowercase()
  .required("Email is required");
