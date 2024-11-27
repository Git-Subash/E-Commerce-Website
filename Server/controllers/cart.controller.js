import cartModel from "../models/cart.model.js";
import userModel from "../models/user.model.js";

export async function addToCartController(req, res) {
  try {
    const userId = req.userId; //auth middleware
    const { productId } = req.body;

    if (!productId) {
      return res.status(402).json({
        message: "Provide the reqied fields",
        success: false,
        error: true,
      });
    }

    const checkCartItem = await cartModel.findOne({
      userId: userId,
      productId: productId,
    });
    if (checkCartItem) {
      return res.status(400).json({
        message: "Item already exsist in the cart",
      });
    }

    const cartItem = new cartModel({
      quantity: 1,
      productId: productId,
      userId: userId,
    });

    const saveCart = await cartItem.save();

    const updateCartUser = await userModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );
    return res.status(200).json({
      message: "Item added to  the cart successful",
      success: true,
      data: saveCart,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: true,
      error: false,
    });
  }
}
