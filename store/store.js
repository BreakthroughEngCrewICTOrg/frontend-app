import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// create a slice
export const iconslice = createSlice({
  name: "icon",
  initialState: {
    icon: "moon",
    user: true,
    userData: "",
  },
  reducers: {
    iconMoon: (state) => {
      state.icon = "moon";
    },
    iconSun: (state) => {
      state.icon = "sun";
    },
 
  },
});

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: "",
  },

  updateUserData: (state, action) => {
    state.userData = action.payload;
  },

});
// config the store
const store = configureStore({
  reducer: {
    icon: iconslice.reducer,
    userData: iconslice.reducer,
  },

});

// export default the store
export default store;

// export the action
export const iconAction = iconslice.actions;
export const userDataAction = userDataSlice.actions;
