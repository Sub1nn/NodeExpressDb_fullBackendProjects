import express from "express";

const app = express();

app.use(express.json());

const port = 8001;

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
