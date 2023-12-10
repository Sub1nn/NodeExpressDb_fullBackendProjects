import express from "express";
import { dbConnect } from "./db.connect.js";
import studentRoutes from "./student.routes.js";
import courseRoutes from "./course.routes.js";

const app = express();

// json middleware
app.use(express.json());

// connect db
dbConnect();

// register routes
app.use(studentRoutes);
app.use(courseRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
