import subCategoryModel from "../models/sub_category.model.js";

export async function createSubCategoryController(req, res) {
  try {
    const { name, categoryId } = req.body;

    if (!name) {
      res.status(400).json({
        message: "Provide the name field",
        success: false,
        error: true,
      });
    }
    if (!categoryId[0]) {
      res.status(400).json({
        message: "Provide the name field",
        success: false,
        error: true,
      });
    }

    const addSubCategory = new subCategoryModel({
      name,
      categoryId,
    });

    const saveSubCategory = addSubCategory.save();

    return res.status(200).json({
      message: "Sub-Category created Successsful",
      success: true,
      error: false,
      data: saveSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function getSubCategoryController(req, res) {
  try {
    const data = await subCategoryModel.find().sort({ createdAt: -1 });

    return res.json({
      message: " sub-categort details",
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

export async function getFilterSubCategory(req, res) {
  try {
    const { search, category } = req.query;

    //create a filter
    const filter = {};
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (category) {
      filter.categoryId = category;
    }

    const subCategory = await subCategoryModel.find(filter);

    return res.status(200).json({
      error: false,
      success: true,
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch products",
      success: false,
    });
  }
}
