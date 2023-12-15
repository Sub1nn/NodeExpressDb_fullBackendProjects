import express from "express";
import laptopRoutes from "./routes/laptopRoute.js";
import { dbConnect } from "./config/dbConnection.js";
const app = express();

app.use(express.json());
app.use(laptopRoutes);
dbConnect();

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
