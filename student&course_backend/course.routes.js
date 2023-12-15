import express from "express";
import { Course } from "./course.model.js";
import { checkMongoIdValidity } from "./utils.js";
import { courseValidationSchema } from "./courseValidation.schema.js";

const router = express.Router();

// ? add course
router.post("/course/add", async (req, res) => {
  const newCourse = req.body;

  //validate courseSchema
  try {
    await courseValidationSchema.validate(newCourse);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  // create course after validation
  await Course.create(newCourse);
  res.status(200).send({ message: "New Course Created" });
});

// ? get a single course details
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

// ? get all course details
router.get("/course", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ message: "Error finding courses" });
  }
});

// ? delete a course

router.delete("course/delete/:id", async (req, res) => {
  const courseId = req.params.id;

  //   validate for mongo id
  const isValid = checkMongoIdValidity(courseId);

  //   if not valid mongo id
  if (!isValid) {
    return res.status(400).send({ message: "Invalid course id." });
  }

  //   find course on the basis of course object Id
  const course = await Course.findOne({ _id: courseId });

  //   if not course
  if (!course) {
    return res.status(404).send({ message: "Course does not exist." });
  }
  // delete course on the basis of course object Id
  await Course.deleteOne({ _id: courseId });
  // return appropriate response
  return res.status(200).send({ message: "Course is removed successfully." });
});

export default router;

// ? update a course

router.get("/course/edit/:id", async (req, res) => {
  courseId = req.params.id;
  courseToBeUpdated = req.body;
  try {
    await courseValidationSchema.validate(courseToBeUpdated);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  const isValid = checkMongoIdValidity(courseId);
  if (!isValid) {
    return res.status(400).send({ message: "Invalid Course Id" });
  }
  const course = await Course.findById(courseId);
  if (!course) {
    res.status(400).send({ message: "Invalid course Id" });
  }
  await Course.updateOne({ _id: courseId }, { ...courseToBeUpdated });
  return res.status(200).send({ message: "Course updated successfully" });
});
