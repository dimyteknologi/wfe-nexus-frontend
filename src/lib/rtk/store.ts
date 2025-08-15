import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from '@/lib/rtk/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer, { logout } from "@/lib/rtk/slicers/auth";
import { authApiService } from '@/lib/rtk/api/auth';

    export const appReducer = combineReducers({
        auth: authReducer,
        [authApiService.reducerPath]: authApiService.reducer
    });

export const rootReducer = (state: any, action: any) => {
    if (action.type === logout.type) {
        state = undefined;
    }
    return appReducer(state, action);
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(authApiService.middleware)
});

export const persistor = persistStore(store);