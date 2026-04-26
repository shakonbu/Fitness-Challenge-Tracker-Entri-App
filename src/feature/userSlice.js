import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:[
            {
            "userid":1,
            "Name":"Shakkina",
            "emailID":"preethna@gmail.com",
            "password":"$OneShak#"
            },
            {
            "userid":2,
            "Name":"Sarah",
            "emailID":"sarah@gmail.com",
            "password":"$TwoSarah#"
            },
            {
            "userid":3,
            "Name":"Sandra",
            "emailID":"sandra@gmail.com",
            "password":"$ThreeSandra#"
            }
        ],
    },
    reducers:{
        addUser:(state,action)=>{
            state.userData.push(action.payload);
        },      
        
        updateUser: (state, action) => {
            const { emailid, updatedData } = action.payload;

            const index = state.userData.findIndex(
                (user) => user.emailID === emailid
            );

            if (index !== -1) {
                state.userData[index] = {
                    ...state.userData[index],
                    ...updatedData
                };
            }
        },
        deleteUser: (state, action) => {
            const userid = action.payload;
            state.userData = state.userData.filter(
                (user) => user.userid !== userid
            );
        },
        deleteUserByEmail: (state, action) => {
            const emailid = action.payload;
            state.userData = state.userData.filter(
                (user) => user.emailID !== emailid
            );
        },
    },
});

export const {addUser,updateUser,deleteUser,deleteUserByEmail}=userSlice.actions;
export default userSlice.reducer;