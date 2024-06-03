import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Combine your reducers
const rootReducer = combineReducers({
  auth: authSlice,
  task: taskSlice,
});

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth"], // Only persist the auth slice
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActions: ["task/setError"],
        // // Ignore these field paths in all actions
        // ignoredActionPaths: ["payload"],
        // // Ignore these paths in the state
        // ignoredPaths: ["tasks.error"],
      },
    }),
});

// Persistor for persisting the store
export const persistor = persistStore(store);
