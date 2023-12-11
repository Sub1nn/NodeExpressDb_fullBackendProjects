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
