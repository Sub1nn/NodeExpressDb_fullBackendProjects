import express from "express";
import costumerRoutes from "./costumer/costumerRoute.js";
import { dbConnect } from "./config/dbConnect.js";
const app = express();

app.use(express.json());
app.use(costumerRoutes);
dbConnect();

const port = 8000;

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
