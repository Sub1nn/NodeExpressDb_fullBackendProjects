import express from "express";
import { Course } from "./course.model.js";
import * as Yup from "yup";
import { checkMongoIdValidity } from "./utils.js";

const router = express.Router();

// add course
router.post("/course/add", async (req, res) => {
  const newCourse = req.body;

  //validate courseSchema with Yup
  let courseSchema = Yup.object({
    name: Yup.string()
      .required()
      .trim()
      .min(1, "Name must be at least 1 character")
      .max(55, "Name must not be more than 55 chars long"),
    price: Yup.number().required().min(1, "Price must be at least 1 euros"),
    duration: Yup.number()
      .required()
      .min(1, "Duration must be  at least 1 day"),
  });

  try {
    await courseSchema.validate(newCourse);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  await Course.create(newCourse);
  res.status(200).send({ message: "New Course Created" });
});

// get a single course details
router.get("/course/details/:id", async (req, res) => {
  const courseId = req.params.id;
  // validate for mongo id
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
  return res.status(200).send(course);
});

// get all course details
router.get("/course", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ message: "Error finding courses" });
  }
});

// delete a course

router.delete("course/delete/:id", async (req, res) => {
  const courseId = req.params.id;

  //   validate for mongo id
  const isValid = checkMongoIdValidity(courseId);

  //   if not valid mongo id
  if (!isValid) {
    return res.status(400).send({ message: "Invalid course id." });
  }

  //   find course
  const course = await Course.findOne({ _id: courseId });

  //   if not course
  if (!course) {
    return res.status(404).send({ message: "Course does not exist." });
  }

  await Course.deleteOne({ _id: courseId });

  return res.status(200).send({ message: "Course is removed successfully." });
});

export default router;
