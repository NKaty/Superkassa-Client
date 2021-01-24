import { combineReducers } from '@reduxjs/toolkit'
import buttonReducer from './button'

const rootReducer = combineReducers({
  button: buttonReducer,
})

export default rootReducer
