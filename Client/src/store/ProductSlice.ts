import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  _id: string;
  name: string;
  image: string;
  status: boolean;
}
interface SubCategoryProps {
  _id: string;
  name: string;
}

interface Products {}

interface productSlice {
  categoryList: Array<Category>;
  subcategoryList: Array<SubCategoryProps>;
  productList: Array<Products>;
}

const initialState: productSlice = {
  categoryList: [],
  subcategoryList: [],
  productList: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Array<Category>>) => {
      state.categoryList = [...action.payload]; // Set categoryList to the payload directly
    },
    setSubCtegory: (state, action: PayloadAction<Array<SubCategoryProps>>) => {
      state.subcategoryList = [...action.payload]; // set sub categoty to the payload  directly
    },
  },
});

export const { setCategory, setSubCtegory } = productSlice.actions;

export default productSlice.reducer;
