import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

var users = [{},{},{}];

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});


app.post("/login", (req, res) => {
  // console.log(req.body, "req.body");
  const { email, password } = req.body;
  console.log(email,"email")

  res.send(email);
});

app.get("/payments/get", (req, res) => {
  res.send("swaraj!");
});

app.get("/cart/one", (req, res) => {
  console.log(process.env.JWT_SECRET, "- process.env.JWT_SECRET");
  console.log(process.env.MONGODB_URL, "- process.env.MONGODB_URL");
  res.send("two!");
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
