import express from "express";
import laptopRoutes from "./routes/laptopRoute.js";
import { dbConnect } from "./config/dbConnection.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/laptop", laptopRoutes);
dbConnect();
app.use(errorHandler);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
