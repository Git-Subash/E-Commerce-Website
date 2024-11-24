import productModel from "../models/product.model.js";

export async function createProductController(req, res) {
  try {
    const {
      name,
      image,
      categoryId,
      sub_categoryId,
      unit,
      stock,
      status,
      price,
      salePrice,
      discount,
      description,
    } = req.body;
    if (
      !name ||
      !image[0] ||
      !categoryId[0] ||
      !sub_categoryId[0] ||
      !unit ||
      !status ||
      !price ||
      !salePrice ||
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
      status,
      price,
      salePrice,
      discount,
      description,
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

export async function getProductsDetails(req, res) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "productId is required",
        error: true,
        success: false,
      });
    }

    const getProduct = await productModel.findOne({ _id: productId });

    return res.json({
      message: "Product details",
      data: getProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateProductDetails(req, res) {
  try {
    const { _id } = req.body;

    if (!_id) {
      return response.status(400).json({
        message: "provide product _id",
        error: true,
        success: false,
      });
    }

    const updateProduct = await productModel.findByIdAndUpdate(
      { _id: _id },
      {
        ...req.body,
      }
    );

    return res.status(200).json({
      message: "product UPdated successfull",
      success: true,
      error: false,
      data: updateProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { _id } = req.body;

    if (!_id) {
      return response.status(400).json({
        message: "provide product _id",
        error: true,
        success: false,
      });
    }

    const deleteProduct = await productModel.deleteOne({ _id: _id });

    return res.status(200).json({
      message: "Product Deleted from the database",
      success: true,
      error: false,
      data: deleteProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
