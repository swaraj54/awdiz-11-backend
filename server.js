import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

var users = [{}, {}, {}];

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

app.post("/login", (req, res) => {
  try {
    // console.log(req.body, "req.body");
    console.log(1);
    const { email, password } = req.body;
    console.log(1);
    console.log(email, "email");
    console.log(1);

    res.send(email);
    console.log(1);
  } catch (error) {
    detectError(error, "login");
    console.log(error, " - error in /login");
    // res.status(500).send("Internal Server Error");
  }
});

function detectError(error, route) {
  if (error instanceof SyntaxError) {
    res.send("Invalid JSON format");
  } else if (error.error == "UnauthorizedError") {
    res.send("Invalid Token");
  }
}

app.get("/payments/get", (req, res) => {
  res.send("swaraj!");
});

app.get("/cart/one", (req, res) => {
  console.log(process.env.JWT_SECRET, "- process.env.JWT_SECRET");
  console.log(process.env.MONGODB_URL, "- process.env.MONGODB_URL");
  res.send("two!");
});

let usersData = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 20 },
  { id: 3, name: "Charlie", age: 35 },
];

app.patch("/user/:id", (req, res) => {
  console.log("inside put request");
  console.log(req.params.id, "- req.params.id");
  const userId = parseInt(req.params.id);
  console.log(userId, "- userId");

  const { name, age } = req.body;

  const user = usersData.find((singleUser) => singleUser.id === userId);
  console.log(user,"user")
  if(!user) {
    return res.status(404).send("User not found");
  }
  console.log(user.name, "- user.name");
  console.log(user.age, "- user.age");
  user.name = name ;
  // user.age = age;
  return res.status(200).send(user);
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
