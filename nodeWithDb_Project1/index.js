import express from "express";
import { dbConnect } from "./db.connect.js";

const app = express();

app.use(express.json());
dbConnect();

const port = 8001;

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
