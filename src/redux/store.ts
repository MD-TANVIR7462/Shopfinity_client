import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi } from './api/baseApi';
import authReducer from './features/authSlice';
import paymentReducer from './features/paymentSlice';
import shoppingCartReducer from './features/shoppingCartSlice';
import wishListReducer from './features/wishListSlice';

const persistConfig = {
  key: 'auth',
  storage,
};

const persistConfigForWishList = {
  key: 'wishList',
  storage,
};

const persistConfigForShoppingCart = {
  key: 'shoppingCart',
  storage,
};

const persistConfigForPayment = {
  key: 'payment',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedWishListReducer = persistReducer(
  persistConfigForWishList,
  wishListReducer
);
const persistedShoppingCartReducer = persistReducer(
  persistConfigForShoppingCart,
  shoppingCartReducer
);
const persistedPaymentReducer = persistReducer(
  persistConfigForPayment,
  paymentReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    wishList: persistedWishListReducer,
    shoppingCart: persistedShoppingCartReducer,
    payment: persistedPaymentReducer,
  },
  //   devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to avoid serializable error
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
