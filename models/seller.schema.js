import mongoose, { Schema } from "mongoose";

const SellerSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  brand: { type: String, required: false },
});

const Seller = mongoose.model("sellers", SellerSchema);

export default Seller;

// {
//   name : "Virat", name
//   email : "virat@gmail.com", email
//   password : "pass@123" password
// }
