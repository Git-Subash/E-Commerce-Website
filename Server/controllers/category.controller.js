import categoryModel from "../models/category,model.js";
import cloudinaryImageUpload from "../utils/cloudinaryImageUpload.js";

export async function createCategoryController(req, res) {
  try {
    const { name } = req.body;
    const image = req.file;

    if (!name) {
      return res.status(400).json({
        message: "Provide valid name",
        success: false,
        error: true,
      });
    }
    if (!image) {
      return res.status(400).json({
        message: "Provide valid image",
        success: false,
        error: true,
      });
    }

    const upload = await cloudinaryImageUpload(image);

    const createCategory = new categoryModel({
      name: name,
      image: upload.url, //the image is in  upload :{url: imageUrl}
    });

    const saveCategory = await createCategory.save();

    return res.status(200).json({
      message: "Category Created successful",
      success: true,
      error: false,
      data: saveCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function getCategoryController(req, res) {
  try {
    const data = await categoryModel.findById().sort({ createdAt: -1 });

    return res.json({
      message: "categort details",
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
