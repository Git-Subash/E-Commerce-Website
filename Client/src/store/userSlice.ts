import { createSlice } from "@reduxjs/toolkit";

interface userSlice {
  _id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  mobile?: string;
  verify_email?: string;
  last_login_date?: string;
  status?: string;
  address_details?: Array<Object>;
  shopping_cart?: Array<Object>;
  orderHistory?: Array<Object>;
  role?: string;
}
// Load initial state from localStorage
const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

const initialState: userSlice = storedUser._id
  ? storedUser
  : {
      _id: "",
      name: "",
      email: "",
      avatar: "",
      mobile: "",
      verify_email: "",
      last_login_date: "",
      status: "",
      address_details: [],
      shopping_cart: [],
      orderHistory: [],
      role: "",
    };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.mobile = action.payload?.mobile;
      state.avatar = action.payload?.avatar;
      state.verify_email = action.payload?.verify_email;
      state.last_login_date = action.payload?.last_login_date;
      state.status = action.payload?.status;
      state.role = action.payload?.role;
      state.orderHistory = action.payload?.orderHistory;
      state.address_details = action.payload?.address_details;
      state.shopping_cart = action.payload?.shopping_cart;

      // Save the updated state to localStorage
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.mobile = "";
      state.verify_email = "";
      state.last_login_date = "";
      state.status = "";
      state.address_details = [];
      state.shopping_cart = [];
      state.orderHistory = [];
      state.role = "";

      // Clear localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { setUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;
