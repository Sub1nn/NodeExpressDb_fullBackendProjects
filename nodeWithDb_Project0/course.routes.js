import express from "express";
import { Course } from "./course.model.js";
const router = express.Router();
import * as Yup from "yup";
import { checkMongoIdValidity } from "./utils.js";
// add course
router.post("/course/add", async () => {
  let courseSchema = Yup.object({
    name: Yup.string().required().trim(),
    price: Yup.number().required(),
    duration: Yup.number().required(),
  });

  try {
    await courseSchema.validate(newCourse);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  const newCourse = req.body;
  await Course.create(newCourse);
  res.status(200).send({ message: "New Course Created" });
});

// get course details
router.get("/course/details/:id", async (req, res) => {
  const courseId = req.params.id;

  const isValid = checkMongoIdValidity(courseId);
  // if not valid mongo id
  if (!isValid) {
    return res.status(400).send({ message: "Invalid Course Id" });
  }
  // find course
  const course = await Course.findOne({ _id: courseId });
  // if not course
  if (!course) {
    return res.status(404).send({ message: "Course not found" });
  }
  // send appropriate response
  return res.status(200).send("Details");
});

export default router;
