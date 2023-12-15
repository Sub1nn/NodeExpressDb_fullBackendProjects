import express from "express";
import { Teacher } from "./teacher.model.js";
const router = express.Router();

export default router;

// create new teacher
router.post("/teacher/add", async (req, res) => {
  const newTeacher = req.body;
  const teacher = await Teacher.findOne({ email: newTeacher.email });
  if (teacher) {
    res
      .status(409)
      .send({ message: "Teacher with the email already registered" });
  }
  try {
    await Teacher.create(newTeacher);
  } catch (error) {
    res.status(400).send({ message: "error.message" });
  }
  return res
    .status(200)
    .send({ message: `Teacher with the name ${newTeacher.name} added` });
});

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).send(teachers);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});
