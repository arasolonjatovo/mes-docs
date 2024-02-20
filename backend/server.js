import express from "express";
import prescriptionRouter from "./routes/prescriptions.js";

const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", prescriptionRouter);

app.listen(PORT, () => {
  console.info("API is listening on port " + PORT);
});
