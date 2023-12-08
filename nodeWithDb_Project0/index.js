import express from "express";
import { dbConnect } from "./db.connect.js";
const app = express();
import studentRoutes from "./student.routes.js";
app.use(express.json());
import courseRoutes from "./course.routes.js";

// connect db
dbConnect();
app.use(studentRoutes);
app.use(courseRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
