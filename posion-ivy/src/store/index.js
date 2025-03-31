import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/conterSlice'
import shopReducer from "../features/shop/shopSlice"
import cartReducer from "../features/cart/cartSlice"
import { shopApi } from "../services/shopServices";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "../features/user/userSlice"
import { authApi } from "../services/authService";


const store = configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
        cart: cartReducer,
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(shopApi.middleware)
            .concat(authApi.middleware)
});

setupListeners(store.dispatch);

export default store;