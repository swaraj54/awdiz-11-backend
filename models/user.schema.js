import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", UserSchema);

export default User;

// {
//   name : "Virat", name 
//   email : "virat@gmail.com", email
//   password : "pass@123" password 
// }