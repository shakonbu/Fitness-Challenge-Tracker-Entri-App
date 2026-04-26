import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null, // { name, role, token }
// };

const authSlice = createSlice({
  name: "auth",
  initialState:{
    authuser:null,
    username:null,
  },
  reducers: {
    login: (state, action) => {
      state.authuser = action.payload;
      //state.username=action.payload;
    },
    loginname:(state,action)=>{
        state.username=action.payload;
    },
    logout: (state) => {
      state.authuser = null;
    },
  },
});

export const { login,loginname,logout } = authSlice.actions;
export default authSlice.reducer;

// Redux resets on refresh — so use localStorage:

// // save on login
// localStorage.setItem("user", JSON.stringify(user));

// // load on app start
// const savedUser = JSON.parse(localStorage.getItem("user"));

// Then initialize:

// const initialState = {
//   user: savedUser || null,
// };
// ⚡ Clean mental model
// Redux = source of truth
// Navbar = just “reads” state
// Login/logout = “updates” state
// UI auto updates 🚀

// If you want next step, I can help you with:

// 🔐 Protected routes (React Router + Redux)
// 🔄 Auto logout on token expiry
// 🌐 API login integration (Axios + middleware)

// Just tell me what you're building — we can make it production-level clean.