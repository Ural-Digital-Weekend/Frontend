import {combineReducers, configureStore} from "@reduxjs/toolkit"
import airportReducer from './slices/AirportSlice'
import airportDetailReducer from './slices/AirportDetailSlice'
import handbookReducer from './slices/HandbookSlice'
import authReducer from './slices/AuthSlice'
import commentReducer from './slices/CommentSlice'

const rootReducer = combineReducers({
  airportReducer,
  handbookReducer,
  authReducer,
  airportDetailReducer,
  commentReducer
})

export function setupStore() {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']