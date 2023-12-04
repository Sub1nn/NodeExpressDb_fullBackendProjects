import express from "express";
import { Student } from "./student.model.js";
const router = express.Router();
export default router;

// create a student

router.post("/student/add", async (req, res) => {
  // extract new student from req.body
  const newStudent = req.body;

  // handle email uniqueness

  // check if user for new student already exists
  const student = await Student.findOne({ email: newStudent.email });

  // is student exists, throw error
  if (student) {
    return res
      .status(409)
      .send({ message: "User with this email already exists" });
  }

  // create student
  try {
    await Student.create(newStudent);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  // send appropriate response
  return res.status(200).send({ message: "student added" });
});
