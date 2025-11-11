import Cart from "../models/cart.schema.js";
import Product from "../models/product.schema.js";

export const AddCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    const isProductExists = await Product.findById(productId);
    if (!isProductExists) {
      return res.json({ success: false, message: "Product not found." });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = Cart({ user: userId, products: [productId] });
    } else {
      const existedProductInCart = cart.products.includes(productId);
      if (existedProductInCart) {
        return res.json({
          success: false,
          message: "Product already in cart.",
        });
      }
      cart.products.push(productId);
    }

    await cart.save();
    return res.json({
      success: true,
      message: "Product Successfully added to cart.",
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal error." });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const userId = req.userId;

    let cart = await Cart.findOne({ user: userId }).populate({
      path: "products",
      select: "name imgUrl category price inStock",
    });

    if (!cart) {
      return res.json({
        success: false,
        message: "Product already in cart.",
        products: [],
      });
    }

    return res.json({
      success: true,
      message: "Product Successfully added to cart.",
      products: cart.products,
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ success: false, message: "Internal error." });
  }
};
