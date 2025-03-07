import { createSlice } from "@reduxjs/toolkit";

const consoleLoggerSlice = createSlice({
  name: "consoleLogger",
  initialState: {},
  reducers: {
    logAction: (state, action) => {
      console.log("Action Dispatched:", action.type);
      console.log("Payload:", action.payload);
    },
  },
});

export const { logAction } = consoleLoggerSlice.actions;
export default consoleLoggerSlice.reducer;
