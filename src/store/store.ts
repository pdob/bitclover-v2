import { configureStore, combineReducers } from '@reduxjs/toolkit'
import settingsReducer from './slices/settingsSlice'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import favouritesReducer from './slices/favouritesSlice'

const rootReducer = combineReducers({
  settings: settingsReducer,
  favourites: favouritesReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
