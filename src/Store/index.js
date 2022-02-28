import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const favState = { favlist: [] };

const favListSlice = createSlice({
  name: "favlist",
  initialState: favState,
  reducers: {
    addToFavList(state, action) {
      const newItem = action.payload;
      const existingItem = state.favlist.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.favlist.push({
          id: newItem.id,
          fullName: newItem.name,
          owner: newItem.owner.login,
          numberOfStars: newItem.stargazers_count,
          link: newItem.forks_url,
        });
        //console.log(existingItem);
        //console.log(state.favlist);
      }

      //console.log(existingItem);
    },
    replaceFavlist(state, action) {
      const loadedList = action.payload;
      state.favlist = loadedList;
    },
    resetSession(state) {
      state.favlist = [];
    },
  },
});

const store = configureStore({ reducer: favListSlice.reducer });

export const favActions = favListSlice.actions;
export default store;
