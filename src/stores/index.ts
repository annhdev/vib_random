import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { omit } from 'lodash'
import { createTransform, FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'
import { Transform, WebStorage } from 'redux-persist/es/types'

import themeReducer from './features/themeSlice'

/**
 * Create a storage for web or node
 */
const storage: WebStorage = createWebStorage('local')

/**
 * Transform state before persist to local storage
 * Only auth and theme will be persisted
 */
const transform: Transform<any, any> = createTransform(
    /**
     * Transform state before persist to local storage
     * @param inboundState
     * @param key
     */
    (inboundState: any, key) => {
        if (['theme'].includes(key as string)) {
            if (key === 'theme') {
                /**
                 * Remove state that you don't want to persist here
                 * Add more state to persist here
                 * (remove drawerShowed if you don't want to persist it)
                 */
                return omit(inboundState, ['drawerShowed'])
            }
            return inboundState
        }
        /**
         * return undefined if you don't want to persist other state
         */
        return undefined
    },
    /**
     * Transform state before it is rehydrated and loaded into redux store
     * @param outboundState
     * @param key
     */
    (outboundState: any, key) => {
        if (['theme'].includes(key as string)) {
            if (key === 'theme') {
                return {
                    ...outboundState,
                    /**
                     * Add more state to persist here
                     * (add drawerShowed if you don't want to persist it)
                     * (drawerShowed: false is default value)
                     */
                    drawerShowed: outboundState.drawerShowed ?? false,
                }
            }
            return outboundState
        }
        /**
         * return undefined if you don't want to load other state
         */
        return undefined
    }
    // define which reducers this transform gets called for.
    // { whitelist: [] }
)

/**
 * Config for redux-persist
 * save all state (auth, theme) with key 'root' to local storage
 */
const persistConfig: any = {
    key: 'root', // key for local storage
    storage,
    transforms: [transform],
}

/**
 * Combine all reducers
 */
const combinedReducers = combineReducers({
    theme: themeReducer,
})

/**
 * Persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, combinedReducers)

/**
 * Create store
 */
export const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([]),
})

/**
 * Setup listeners
 */
setupListeners(store.dispatch)

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
