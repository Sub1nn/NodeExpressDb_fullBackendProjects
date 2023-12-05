import express from "express";
import costumerRoutes from "./costumerRoute.js";
import { dbConnect } from "./dbConnect.js";
const app = express();

app.use(express.json());
app.use(costumerRoutes);
dbConnect();

const port = 8002;

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
