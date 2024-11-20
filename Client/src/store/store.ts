import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import addressReducer from "./addressSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
  },
});

// Subscribe to store changes
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("user", JSON.stringify(state.user));
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
