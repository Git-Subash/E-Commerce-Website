import productModel from "../models/product.model.js";

export async function CreateProductContoller(req, res) {
  try {
    const {
      name,
      image,
      categoryId,
      sub_categoryId,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = req.body;
    if (
      !name ||
      !image[0] ||
      !categoryId[0] ||
      !sub_categoryId[0] ||
      !unit ||
      !price ||
      !description
    ) {
      return res.status(400).json({
        message: "Proveide the requied fields",
        success: false,
        error: true,
      });
    }
    const product = new productModel({
      name,
      image,
      categoryId,
      sub_categoryId,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });
    const saveProduct = await product.save();

    return res.status(200).json({
      message: "product added successful",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
