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
import notificationSlice from "./notificationSlice";
const rootReducer = combineReducers({
  auth: authSlice,
  task: taskSlice,
  notification: notificationSlice,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth"], // set only the state of auth
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "task/setError",
        ],
      },
    }),
});

export const persistor = persistStore(store);
