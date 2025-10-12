import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

app.get("/payments/get", (req, res) => {
  res.send("swaraj!");
});

app.get("/cart/one", (req, res) => {
  res.send("two!");
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
