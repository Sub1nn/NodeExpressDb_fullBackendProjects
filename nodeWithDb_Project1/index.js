import express from "express";
import { dbConnect } from "./db.connect.js";
import teacherRoutes from "./teacher.routes.js";
const app = express();

app.use(express.json());
app.use(teacherRoutes);
dbConnect();

const port = 8001;

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
