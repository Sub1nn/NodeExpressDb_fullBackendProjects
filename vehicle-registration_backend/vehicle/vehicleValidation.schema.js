import * as Yup from "yup";

export const vehicleValidationSchema = Yup.object({
  name: Yup.string()
    .min(1, "Name must be at least 1 character.")
    .max(55, "Name must be at most 55 characters.")
    .trim()
    .required(),

  model: Yup.number().min(2000).max(2100).required(),

  color: Yup.array().of(Yup.string().trim()).required(),

  power: Yup.number().min(0, "Power cannot be negative.").required(),

  torque: Yup.number().min(0, "Torque cannot be negative.").required(),
});

// skip-limit data validation

export const getVehicleListValidationSchema = Yup.object({
  page: Yup.number("Page must be a number")
    .min(1, "Page must be at least 1")
    .integer("Page must be an integer")
    .default(1),
  limit: Yup.number()
    .min(1, "Limit must be at least 1")
    .integer("Limit must be an integer")
    .default(1),
});
