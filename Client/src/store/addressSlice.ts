import { createSlice } from "@reduxjs/toolkit";

interface Address {
  _id: string;
  address_title: string;
  address_line: string;
  city: string;
  state: string;
  country: string;
  mobile: string;
  pincode: string;
}

interface addressSlice {
  addressList: Array<Address>;
}

const initialState: addressSlice = {
  addressList: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    handleAddAddress: (state, action) => {
      state.addressList = [...action.payload];
    },
  },
});

export const { handleAddAddress } = addressSlice.actions;

export default addressSlice.reducer;
