import * as Yup from "yup";
import dayjs from "dayjs";

const currentDate = dayjs();
export const todoValidationSchema = Yup.object({
  title: Yup.string().max(20).trim().required(),
  description: Yup.string().required().trim().max(55),
  date: Yup.date().min(currentDate).required(),
});
