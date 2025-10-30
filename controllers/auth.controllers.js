import User from "../models/user.schema.js";

export const Login = (req, res) => {
  res.send("Login Route");
};

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // console.log(name, email, password);

    // const isUserExist = User.find({ email: "virat@gmail.com" });
    // const isUserExist = await User.find({ email: email });
    // console.log(isUserExist, "isUserExist");
    const isUserExistForOne = await User.findOne({ email: email });
    console.log(isUserExistForOne, "isUserExistForOne");
    if (isUserExistForOne) {
      return res.status(400).send({ message: "Email already exists." });
    }
    const newUser = User({ name: name, email, password });
    // console.log(newUser, "newUser");
    await newUser.save();
    res.status(201).send({ message: "User Registered Successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "Error in Registering user" });
  }
};

// export { Login, Register };
