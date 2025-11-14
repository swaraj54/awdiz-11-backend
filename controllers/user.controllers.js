import Cart from "../models/cart.schema.js";
import Order from "../models/order.schema.js";
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

    let cart = await User.find({
      $and: [{ age: { $gt: 18 } }, { isVerified: { $eq: true } }, ],
    }).populate({
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

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    let cart = await Cart.findOne({ user: userId }).populate({
      path: "products",
      select: "name imgUrl category price inStock",
    });

    if (!cart) {
      return res.json({
        success: false,
        message: "No Product found in cart.",
        products: [],
      });
    }
    let productsArray = [];
    let totalPrice = 0;
    for (let i = 0; i < cart?.products.length; i++) {
      productsArray.push(cart?.products[i]._id);
      totalPrice += cart?.products[i].price;
    }

    const newOrder = Order({
      user: userId,
      products: productsArray,
      price: totalPrice,
    });

    await newOrder.save();

    // check if have stock
    // Product document reduce the quantity
    // display order to respective seller

    // make cart empty
    cart.products = [];
    await cart.save();

    return res.json({
      success: true,
      message: "Order Successfully placed.",
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ success: false, message: "Internal error." });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ user: userId }).populate({
      path: "products",
      select: "name imgUrl category price inStock",
    });

    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error, "error");
    return res.json({ success: false, message: "Internal error." });
  }
};
