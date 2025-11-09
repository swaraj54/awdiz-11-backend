import Product from "../models/product.schema.js";

export const CreateProduct = (req, res) => {
  res.send("Create Product Route");
};

export const GetProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    return res.json({ success: true, products });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send({ message: "Error in getting current user", success: false });
  }
};

export const ProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "products");
    const product = await Product.findById(id);
    return res.json({ success: true, product });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send({ message: "Error in getting current user", success: false });
  }
};
