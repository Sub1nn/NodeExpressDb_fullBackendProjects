import express from "express";
import { Student } from "./student.model.js";
const router = express.Router();
export default router;

// create a student

router.post("/student/add", async (req, res) => {
  // extract new student from req.body
  const newStudent = req.body;

  // handle email uniqueness

  // check if user for newStudent already exists
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

// get all students data
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).send(students);
  } catch (error) {
    return res.status(400).send({ message: "Student not found" });
  }
});

// get a single student data
router.get("/student/details/:id", async (req, res) => {
  const studentId = req.params.id;
  const student = await Student.findOne({ _id: studentId });

  if (!student) {
    return res.status(404).send({ message: "Student not found" });
  }
  return res.status(200).send(student);
});

// delete a student
router.delete("/student/details/:id", async (req, res) => {
  const studentId = req.params.id;
  const student = await Student.findById(studentId);
  if (!student) {
    return res.status.send(404).send({ message: "Student does not exist" });
  }
  // await Student.deleteOne({ _id: studentId });
  await Student.findByIdAndDelete(studentId);
  return res
    .status(200)
    .send({ message: `Student with id ${studentId} deleted successfully` });
});

//update a student
router.put("/student/update/:id", async (req, res) => {
  const studentId = req.params.id;
  const newValues = req.body;

  const student = await Student.findOne({ _id: studentId });
  if (!student) {
    return res.status(404).send({ message: "Student does not exist" });
  }

  await Student.updateOne({ _id: studentId }, { ...newValues });
  return res
    .status(200)
    .send({ message: `Student with id ${studentId} updated successfully` });
});

// get multiple student

router.get("/student/list", async (req, res) => {
  // extract data from req.body
  const { limit, searchKey, page } = req.body;

  const skip = (page - 1) * limit;

  const studentList = await Student.aggregate([
    {
      $match: {
        name: { $regex: searchKey, $options: "i" },
      },
    },
    {
      $skip: skip,
    },
    { $limit: limit },
  ]);

  return res.status(200).send(studentList);
});
