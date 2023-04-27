import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    searchingStatus: false,
    found: null,
    value: [],
  },
  reducers: {
    incrementByAmount: (state, action) => {
      // console.log("counter", action.payload);

      return {
        ...state,
        searchingStatus: state.searchingStatus,
        value: action.payload,
      };
    },
    ifFound: (state, action) => {
      return {
        ...state,
        found: action.payload,
       
      };
    },
    searchCHange: (state) => {
      // console.log("counter", action.payload);
      return {
        ...state,
        searchingStatus: !state.searchingStatus,
        ...state.value,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementByAmount, searchCHange, ifFound } =
  counterSlice.actions;

export default counterSlice.reducer;
